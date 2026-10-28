// Topes del mes para que nunca haya un cobro (AGENTE-WHATSAPP-PLAN.md, sección 3):
// créditos de Claude, mensajes del plan gratis de Kapso y respuestas
// gratis de Meta. Vive en un solo Durable Object ("global").

import type { Config } from "./config";
import { horaMexico } from "./util";

export interface Almacen {
  get<T>(clave: string): Promise<T | undefined>;
  put<T>(clave: string, valor: T): Promise<void>;
  deleteAll(): Promise<void>;
  setAlarm(cuando: number): Promise<void>;
  deleteAlarm(): Promise<void>;
}

export interface EstadoControl {
  mes: string;
  costoUsd: number;
  mensajesKapso: number;
  respuestasMeta: number;
  costoDia: Record<string, number>;
  avisados: string[];
}

export type Verificacion = { ok: true } | { ok: false; motivo: string; avisar: boolean };

export interface Registro {
  entradas?: number; // mensajes que llegan (clientes y ecos del dueño)
  salidas?: number; // mensajes que manda el agente
  costoUsd?: number;
}

export class Control {
  constructor(
    private almacen: Almacen,
    private topes: Config["topes"],
  ) {}

  private async estado(ahora: number): Promise<EstadoControl> {
    const { mes } = horaMexico(ahora);
    const e = await this.almacen.get<EstadoControl>("estado");
    if (e && e.mes === mes) return e;
    return { mes, costoUsd: 0, mensajesKapso: 0, respuestasMeta: 0, costoDia: {}, avisados: [] };
  }

  async registrar(r: Registro, ahora: number): Promise<void> {
    const e = await this.estado(ahora);
    const { fecha } = horaMexico(ahora);
    e.mensajesKapso += (r.entradas ?? 0) + (r.salidas ?? 0);
    e.respuestasMeta += r.salidas ?? 0;
    e.costoUsd += r.costoUsd ?? 0;
    e.costoDia = { [fecha]: (e.costoDia[fecha] ?? 0) + (r.costoUsd ?? 0) };
    await this.almacen.put("estado", e);
  }

  /** ¿Puede el agente contestar con IA ahora? Avisa una sola vez por tope y periodo. */
  async verificar(ahora: number): Promise<Verificacion> {
    const e = await this.estado(ahora);
    const { fecha } = horaMexico(ahora);
    const t = this.topes;
    let motivo: string | null = null;
    let clave = "";
    if (e.costoUsd >= t.claudeMesUsd) {
      motivo = `Se llegó al tope de Claude del mes ($${t.claudeMesUsd} USD).`;
      clave = `claude-mes-${e.mes}`;
    } else if (e.mensajesKapso >= t.mensajesKapsoMes) {
      motivo = `Se llegó al tope de mensajes del plan gratis de Kapso (${t.mensajesKapsoMes}).`;
      clave = `kapso-${e.mes}`;
    } else if (e.respuestasMeta >= t.respuestasMetaMes) {
      motivo = `Se llegó al tope de respuestas gratis de Meta (${t.respuestasMetaMes}).`;
      clave = `meta-${e.mes}`;
    } else if ((e.costoDia[fecha] ?? 0) >= t.claudeDiaUsd) {
      motivo = `Se llegó al tope de Claude del día ($${t.claudeDiaUsd} USD).`;
      clave = `claude-dia-${fecha}`;
    }
    if (!motivo) return { ok: true };
    const avisar = !e.avisados.includes(clave);
    if (avisar) {
      e.avisados.push(clave);
      await this.almacen.put("estado", e);
    }
    return { ok: false, motivo, avisar };
  }

  async resumen(ahora: number): Promise<EstadoControl> {
    return this.estado(ahora);
  }
}
