# Inventario de agentes instalados — The Agency

Lista completa de los **270 agentes** instalados en `/root/.claude/agents/`
desde [`msitarzewski/agency-agents`](https://github.com/msitarzewski/agency-agents)
el 18 de agosto de 2026. Es un anexo de
[`SKILLS-USADAS.md`](./SKILLS-USADAS.md), que explica qué son, cómo se
instalaron y qué advertencias aplican.

Se documentan **todos**, no solo los que se usan: sirve para saber qué
hay disponible antes de resolver un problema desde cero. Los marcados con
⭐ tienen aplicación directa en esta tienda; la razón concreta está en su
fila.

**Advertencia que aplica a todos:** estos agentes traen `Bash` entre sus
herramientas y su conocimiento es genérico. Cuando un consejo suyo
contradiga un hallazgo verificado de esta tienda (lo documentado en
`MANUAL-PROYECTO.md`), gana lo documentado aquí.

## Resumen por división

| División | Agentes | Qué cubre |
|---|---|---|
| [Ingeniería](#ingenieria) | 58 | Desarrollo, arquitectura, infraestructura y datos. |
| [Especializados](#especializados) | 57 | Nichos concretos: IA/LLM, blockchain, mercado chino, legal, inmobiliario, dispositivos. |
| [Marketing](#marketing) | 36 | Contenido, SEO, redes sociales, crecimiento y plataformas chinas. |
| [Videojuegos](#videojuegos) | 21 | Unity, Unreal, Godot y Roblox — sin aplicación en esta tienda. |
| [GIS / geoespacial](#gis--geoespacial) | 13 | Mapas, datos espaciales y percepción remota — sin aplicación aquí. |
| [Seguridad](#seguridad) | 12 | Auditoría, respuesta a incidentes, cumplimiento y seguridad de aplicaciones. |
| [Diseño](#diseño) | 10 | Interfaz, experiencia de usuario, marca y accesibilidad. |
| [Ventas](#ventas) | 9 | Prospección, calificación de oportunidades y gestión de cuentas B2B. |
| [Pruebas y QA](#pruebas-y-qa) | 9 | Automatización de pruebas, rendimiento y verificación con evidencia. |
| [Gestión de proyectos](#gestion-de-proyectos) | 7 | Coordinación, sprints, experimentos y operaciones de estudio. |
| [Publicidad pagada](#publicidad-pagada) | 7 | **La división que aplica directamente a la campaña de Meta.** |
| [Académicos](#academicos) | 6 | Historia, psicología, estadística, narratología, antropología, geografía. |
| [Soporte](#soporte) | 6 | Atención a clientes, devoluciones, onboarding y servicio. |
| [Cómputo espacial](#computo-espacial) | 6 | AR/VR/XR y visionOS — sin aplicación aquí. |
| [Finanzas](#finanzas) | 5 | Contabilidad, FP&A, precios, impuestos e inversión. |
| [Producto](#producto) | 5 | Gestión de producto, priorización y síntesis de feedback. |
| [Salud](#salud) | 3 | Facturación médica, cumplimiento clínico y sistemas de salud — sin aplicación aquí. |
| **Total** | **270** | |

---

## Ingeniería

Desarrollo, arquitectura, infraestructura y datos.

| Agente | Slug | Qué hace |
|---|---|---|
| AI Data Remediation Engineer | `engineering-ai-data-remediation-engineer` | "Specialist in self-healing data pipelines — uses air-gapped local SLMs and semantic clustering to automatically detect, classify, and fix data... |
| AI Engineer | `engineering-ai-engineer` | Expert AI/ML engineer specializing in machine learning model development, deployment, and integration into production systems. |
| API Platform Engineer | `engineering-api-platform-engineer` | Expert API platform engineer for public and partner APIs — contract-first design (OpenAPI/gRPC), versioning and deprecation policy, SDK... |
| Autonomous Optimization Architect | `engineering-autonomous-optimization-architect` | Intelligent system governor that continuously shadow-tests APIs for performance while enforcing strict financial and security guardrails against... |
| Backend Architect | `engineering-backend-architect` | Senior backend architect specializing in scalable system design, database architecture, API development, and cloud infrastructure. |
| CMS Developer | `engineering-cms-developer` | Drupal and WordPress specialist for theme development, custom plugins/modules, content architecture, and code-first CMS implementation |
| Code Reviewer | `engineering-code-reviewer` | Expert code reviewer who provides constructive, actionable feedback focused on correctness, maintainability, security, and performance — not style... |
| Codebase Onboarding Engineer | `engineering-codebase-onboarding-engineer` | Expert developer onboarding specialist who helps new engineers understand unfamiliar codebases fast by reading source code, tracing code paths,... |
| Data Engineer | `engineering-data-engineer` | Expert data engineer specializing in building reliable data pipelines, lakehouse architectures, and scalable data infrastructure. |
| Data Visualization Engineer | `engineering-data-visualization-engineer` | Expert data visualization engineer — chart-type selection by data and question, perceptually honest encodings, colorblind-safe data palettes,... |
| Database Optimizer | `engineering-database-optimizer` | Expert database specialist focusing on schema design, query optimization, indexing strategies, and performance tuning for PostgreSQL, MySQL, and... |
| Database Reliability Engineer | `engineering-database-reliability-engineer` | Expert database reliability engineer (DBRE) — high availability and replication, automated failover, backup and point-in-time recovery,... |
| Desktop App Engineer | `engineering-desktop-app-engineer` | Expert desktop application engineer for Electron and Tauri — secure IPC and process isolation, code signing and notarization, auto-update... |
| Developer Tooling Engineer | `engineering-developer-tooling-engineer` | Expert developer-tooling and CLI engineer — building command-line tools and internal developer platforms with great DX: intuitive command design,... |
| DevOps Automator | `engineering-devops-automator` | Expert DevOps engineer specializing in infrastructure automation, CI/CD pipeline development, and cloud operations |
| Drupal Performance Engineer | `engineering-drupal-performance` | Expert Drupal 10/11 performance engineer specializing in Core Web Vitals, render and dynamic page caching, BigPipe, cache tags and contexts,... |
| Drupal Shopping Cart Engineer | `engineering-drupal-shopping-cart` | Expert Drupal e-commerce engineer specializing in Drupal Commerce for product catalog management, payment gateway integration, checkout workflow... |
| Email Intelligence Engineer | `engineering-email-intelligence-engineer` | Expert in extracting structured, reasoning-ready data from raw email threads for AI agents and automation systems |
| Embedded Firmware Engineer | `engineering-embedded-firmware-engineer` | Specialist in bare-metal and RTOS firmware - ESP32/ESP-IDF, PlatformIO, Arduino, ARM Cortex-M, STM32 HAL/LL, Nordic nRF5/nRF Connect SDK,... |
| Feishu Integration Developer | `engineering-feishu-integration-developer` | Full-stack integration expert specializing in the Feishu (Lark) Open Platform — proficient in Feishu bots, mini programs, approval workflows,... |
| Filament Optimization Specialist | `engineering-filament-optimization-specialist` | Expert in restructuring and optimizing Filament PHP admin interfaces for maximum usability and efficiency. |
| FinOps Engineer | `engineering-finops-engineer` | Expert cloud cost engineer for AWS/GCP/Azure — cost allocation and tagging, rightsizing, commitment planning (reserved instances/savings plans),... |
| Frontend Developer | `engineering-frontend-developer` | Expert frontend developer specializing in modern web technologies, React/Vue/Angular frameworks, UI implementation, and performance optimization |
| GaussDB Expert Engineer | `engineering-gaussdb-expert` | Expert database specialist focusing on GaussDB OLTP — Huawei's self-developed enterprise-grade relational database (NOT GaussDB(DWS) OLAP, NOT... |
| Git Workflow Master | `engineering-git-workflow-master` | Expert in Git workflows, branching strategies, and version control best practices including conventional commits, rebasing, worktrees, and... |
| Internationalization Engineer | `engineering-i18n-engineer` | Expert i18n engineer for ICU MessageFormat, CLDR plural rules, RTL and bidirectional layouts, locale-aware date/number/currency formatting, string... |
| Identity & Access Engineer | `engineering-identity-access-engineer` | Expert identity engineer for OAuth 2.0/OIDC flows, enterprise SSO (SAML/OIDC) and SCIM provisioning, passkeys/WebAuthn, session architecture, and... |
| Incident Response Commander | `engineering-incident-response-commander` | Expert incident commander specializing in production incident management, structured response coordination, post-mortem facilitation, SLO/SLI... |
| IoT Fleet Engineer | `engineering-iot-fleet-engineer` | Expert IoT and edge fleet engineer — device provisioning and identity, MQTT/telemetry pipelines, staged over-the-air (OTA) firmware updates with... |
| IT Service Manager | `engineering-it-service-manager` | Expert IT service management specialist using ITIL 4 framework for service catalog design, incident and problem management, change control, SLA... |
| LLM Post-Training Engineer | `engineering-llm-post-training-engineer` | Evidence-driven owner for SFT, preference optimization, RLHF/RLVR, MoE post-training, and the release gates that turn a checkpoint into a... |
| Minimal Change Engineer | `engineering-minimal-change-engineer` | Engineering specialist focused on minimum-viable diffs — fixes only what was asked, refuses scope creep, prefers three similar lines over a... |
| Mobile App Builder | `engineering-mobile-app-builder` | Specialized mobile application developer with expertise in native iOS/Android development and cross-platform frameworks |
| Mobile Release Engineer | `engineering-mobile-release-engineer` | Expert mobile release and distribution engineer for iOS and Android — code signing, provisioning, fastlane pipelines, App Store Connect and Play... |
| Multi-Agent Systems Architect | `engineering-multi-agent-systems-architect` | Systems architect specializing in the design, coordination, and governance of multi-agent AI pipelines — covering topology selection, context... |
| Network Engineer | `engineering-network-engineer` | Expert network engineer for Cisco IOS/IOS-XE, Cisco ASA/FTD, Juniper Junos, and Palo Alto PAN-OS routing, switching, firewalling, and troubleshooting. |
| OrgScript Engineer | `engineering-orgscript-engineer` | Expert in designing, parsing, and implementing OrgScript grammar, AST validation, and business logic definitions. |
| ⭐ Payments & Billing Engineer | `engineering-payments-billing-engineer` | Pasarelas de pago — relevante tras desactivar Shopify Payments. |
| Privacy Engineer | `engineering-privacy-engineer` | Expert privacy engineer who implements privacy in code — PII discovery and classification, data minimization, consent enforcement at the API... |
| Prompt Engineer | `engineering-prompt-engineer` | Specialist in crafting, testing, and systematically optimizing prompts for LLMs — turning vague instructions into reliable, production-grade AI... |
| RAG Pipeline Engineer | `engineering-rag-pipeline-engineer` | Production RAG specialist focused on chunking strategy, retrieval quality, hybrid search, re-ranking, and eval-driven iteration. |
| Rapid Prototyper | `engineering-rapid-prototyper` | Specialized in ultra-fast proof-of-concept development and MVP creation using efficient tools and frameworks |
| Realtime Collaboration Engineer | `engineering-realtime-collaboration-engineer` | Expert realtime systems engineer for WebSocket/SSE infrastructure, presence, CRDT and OT-based collaborative editing, offline-first sync engines,... |
| Rust Refactoring Specialist | `engineering-rust-refactoring-specialist` | Expert Rust engineer for repository-scale refactoring, safe renames, module restructuring, duplication removal, panic hardening, ownership... |
| Search Relevance Engineer | `engineering-search-relevance-engineer` | Expert search engineer for Elasticsearch and OpenSearch — index and analyzer design, BM25 query tuning, hybrid lexical+vector retrieval, and... |
| Section 508 Accessibility Specialist | `engineering-section-508-specialist` | Expert U.S. |
| Senior Developer | `engineering-senior-developer` | Premium implementation specialist - Masters Laravel/Livewire/FluxUI, advanced CSS, Three.js integration |
| Software Architect | `engineering-software-architect` | Expert software architect specializing in system design, domain-driven design, architectural patterns, and technical decision-making for scalable,... |
| Solidity Smart Contract Engineer | `engineering-solidity-smart-contract-engineer` | Expert Solidity developer specializing in EVM smart contract architecture, gas optimization, upgradeable proxy patterns, DeFi protocol... |
| SRE (Site Reliability Engineer) | `engineering-sre` | Expert site reliability engineer specializing in SLOs, error budgets, observability, chaos engineering, and toil reduction for production systems... |
| Technical Writer | `engineering-technical-writer` | Expert technical writer specializing in developer documentation, API references, README files, and tutorials. |
| USWDS Developer | `engineering-uswds-developer` | Expert U.S. |
| Video Streaming Engineer | `engineering-video-streaming-engineer` | Expert video streaming engineer for adaptive bitrate delivery — HLS/DASH packaging, ffmpeg transcode ladders, CMAF low-latency, DRM, CDN delivery,... |
| Voice AI Integration Engineer | `engineering-voice-ai-integration-engineer` | Expert in building end-to-end speech transcription pipelines using Whisper-style models and cloud ASR services — from raw audio ingestion through... |
| WebAssembly Engineer | `engineering-webassembly-engineer` | Expert WebAssembly engineer — compiling Rust/C++/Go to Wasm, JS interop and the boundary marshalling cost, WASI and server-side runtimes... |
| WeChat Mini Program Developer | `engineering-wechat-mini-program-developer` | Expert WeChat Mini Program developer specializing in 小程序 development with WXML/WXSS/WXS, WeChat API integration, payment systems, subscription... |
| WordPress Performance Engineer | `engineering-wordpress-performance` | Expert WordPress performance engineer specializing in Core Web Vitals, object caching (Redis/Memcached), page caching, database and WP_Query... |
| WordPress Shopping Cart Engineer | `engineering-wordpress-shopping-cart` | Expert WordPress e-commerce engineer specializing in WooCommerce for product catalog management, payment gateway integration, checkout... |

---

## Especializados

Nichos concretos: IA/LLM, blockchain, mercado chino, legal, inmobiliario, dispositivos.

| Agente | Slug | Qué hace |
|---|---|---|
| Accounts Payable Agent | `accounts-payable-agent` | Autonomous payment processing specialist that executes vendor payments, contractor invoices, and recurring bills across any payment rail — crypto,... |
| Agentic Identity & Trust Architect | `agentic-identity-trust` | Designs identity, authentication, and trust verification systems for autonomous AI agents operating in multi-agent environments. |
| Agents Orchestrator | `agents-orchestrator` | Autonomous pipeline manager that orchestrates the entire development workflow. |
| Automation Governance Architect | `automation-governance-architect` | Governance-first architect for business automations (n8n-first) who audits value, risk, and maintainability before implementation. |
| Business Strategist | `business-strategist` | Senior management consulting specialist for competitive analysis, market entry strategy, business model design, growth planning, organizational... |
| Change Management Consultant | `change-management-consultant` | Expert change management specialist using ADKAR, Kotter, and Prosci frameworks to guide organizations through technology implementations,... |
| Chief Financial Officer | `chief-financial-officer` | Strategic finance executive who governs capital allocation, treasury operations, financial planning, M&A finance, investor relations, and board... |
| Corporate Training Designer | `corporate-training-designer` | Expert in enterprise training system design and curriculum development — proficient in training needs analysis, instructional design methodology,... |
| ⭐ Customer Service | `customer-service` | Atención a clientes; cruza con Cartucho (Zipchat), sección 18 del manual. |
| Customer Success Manager | `customer-success-manager` | Strategic customer success specialist for onboarding, health scoring, QBR facilitation, churn prevention, expansion identification, and renewal... |
| Data Consolidation Agent | `data-consolidation-agent` | AI agent that consolidates extracted sales data into live reporting dashboards with territory, rep, and pipeline summaries |
| Data Privacy Officer | `data-privacy-officer` | Corporate data privacy specialist and DPO who builds GDPR, CCPA, and global privacy compliance programs — covering data mapping, privacy impact... |
| ESG & Sustainability Officer | `esg-sustainability-officer` | Corporate sustainability strategist and ESG reporting specialist who builds environmental, social, and governance programs, manages disclosures,... |
| Government Digital Presales Consultant | `government-digital-presales-consultant` | Presales expert for China's government digital transformation market (ToG), proficient in policy interpretation, solution design, bid document... |
| Grant Writer | `grant-writer` | Expert grant writing specialist for nonprofits, research institutions, and social enterprises — covering prospect research, letter of inquiry... |
| Aging Parent Care Companion | `healthcare-aging-parent-care-companion` | Compassionate, HIPAA-aligned care coordination and decision-support agent for family caregivers managing an aging parent's appointments,... |
| Healthcare Customer Service | `healthcare-customer-service` | Empathetic healthcare customer service specialist for patient support, billing inquiries, appointment management, insurance questions, complaint... |
| Healthcare Marketing Compliance Specialist | `healthcare-marketing-compliance` | Expert in healthcare marketing compliance in China, proficient in the Advertising Law, Medical Advertisement Management Measures, Drug... |
| Hospitality Guest Services | `hospitality-guest-services` | Comprehensive hospitality guest services specialist for hotels, resorts, restaurants, and event venues — covering reservations,... |
| HR Onboarding | `hr-onboarding` | Comprehensive HR onboarding specialist for employee orientation, documentation management, compliance tracking, benefits enrollment, culture... |
| Identity Graph Operator | `identity-graph-operator` | Operates a shared identity graph that multiple AI agents resolve against. |
| Language Translator | `language-translator` | Real-time Spanish ↔ English translation specialist with cultural context, regional dialect awareness, travel phrase guidance, and tone-appropriate... |
| Legal Billing & Time Tracking | `legal-billing-time-tracking` | Comprehensive legal billing and time tracking specialist for accurate time capture, invoice generation, billing narrative writing, collections... |
| Legal Client Intake | `legal-client-intake` | Comprehensive legal client intake specialist for qualifying prospects, collecting case information, scheduling consultations, managing conflict... |
| Legal Document Review | `legal-document-review` | Comprehensive legal document review specialist for contracts, litigation documents, and real estate agreements — summarizing documents, flagging... |
| Loan Officer Assistant | `loan-officer-assistant` | Comprehensive loan officer assistant for mortgage and lending professionals — covering borrower intake, pre-qualification, document collection,... |
| LSP/Index Engineer | `lsp-index-engineer` | Language Server Protocol specialist building unified code intelligence systems through LSP client orchestration and semantic indexing |
| M&A Integration Manager | `ma-integration-manager` | Mergers and acquisitions integration specialist who designs and executes post-merger integration programs — covering Day 1 readiness, 100-day... |
| Medical Billing & Coding Specialist | `medical-billing-coding-specialist` | Expert medical billing and coding specialist for ICD-10-CM/PCS, CPT, and HCPCS coding, claim submission, denial management, revenue cycle... |
| Operations Manager | `operations-manager` | Business operations specialist who applies Lean, Six Sigma, and systems thinking to process mapping, capacity planning, KPI governance, vendor... |
| Organizational Psychologist | `organizational-psychologist` | Applied organizational psychologist who diagnoses team dynamics, psychological safety, burnout risk, and culture health — using evidence-based... |
| Personal Growth Mentor | `personal-growth-mentor` | Cross-domain personal development mentor for goal clarity, habit design, strategic decisions, and accountability without motivational fluff. |
| Real Estate Buyer & Seller | `real-estate-buyer-seller` | Comprehensive real estate agent assistant for buyer representation, seller representation, listing management, offer negotiation, transaction... |
| Recruitment Specialist | `recruitment-specialist` | Expert recruitment operations and talent acquisition specialist — skilled in China's major hiring platforms, talent assessment frameworks, and... |
| Report Distribution Agent | `report-distribution-agent` | AI agent that automates distribution of consolidated sales reports to representatives based on territorial parameters |
| Resume Tailor | `resume-tailor` | Candidate-side resume optimization specialist who analyzes job descriptions, maps real experience to role requirements, improves ATS keyword... |
| ⭐ Retail Customer Returns | `retail-customer-returns` | Devoluciones y cambios — la tienda promete 7 días. |
| Sales Data Extraction Agent | `sales-data-extraction-agent` | AI agent specialized in monitoring Excel files and extracting key sales metrics (MTD, YTD, Year End) for internal live reporting |
| Sales Outreach | `sales-outreach` | Consultative B2B sales outreach specialist for cold prospecting, lead follow-up, objection handling, proposal writing, and pipeline management —... |
| Chief of Staff | `specialized-chief-of-staff` | Master coordinator for founders and executives — filters noise, owns processes, enforces consistency, routes decisions, and positions outputs for... |
| Civil Engineer | `specialized-civil-engineer` | Expert civil and structural engineer with global standards coverage — Eurocode, DIN, ACI, AISC, ASCE, AS/NZS, CSA, GB, IS, AIJ, and more. |
| Codebase Archaeologist | `specialized-codebase-archaeologist` | Multi-session, multi-tool drift detection specialist who audits codebases touched by several AI coding tools (Claude, Cursor, Copilot, Windsurf,... |
| Cultural Intelligence Strategist | `specialized-cultural-intelligence-strategist` | CQ specialist that detects invisible exclusion, researches global context, and ensures software resonates authentically across intersectional... |
| Developer Advocate | `specialized-developer-advocate` | Expert developer advocate specializing in building developer communities, creating compelling technical content, optimizing developer experience... |
| Document Generator | `specialized-document-generator` | Expert document creation specialist who generates professional PDF, PPTX, DOCX, and XLSX files using code-based approaches with proper formatting,... |
| FedRAMP & RMF Compliance Engineer | `specialized-fedramp-rmf-compliance` | Expert FedRAMP and NIST Risk Management Framework compliance engineer specializing in both FedRAMP authorization pathways — the traditional Rev5... |
| French Consulting Market Navigator | `specialized-french-consulting-market` | Navigate the French ESN/SI freelance ecosystem — margin models, platform mechanics (Malt, collective.work), portage salarial, rate positioning,... |
| Korean Business Navigator | `specialized-korean-business-navigator` | Korean business culture for foreign professionals — 품의 decision process, nunchi reading, KakaoTalk business etiquette, hierarchy navigation, and... |
| MCP Builder | `specialized-mcp-builder` | Expert Model Context Protocol developer who designs, builds, and tests MCP servers that extend AI agent capabilities with custom tools, resources,... |
| Model QA Specialist | `specialized-model-qa` | Independent model QA expert who audits ML and statistical models end-to-end - from documentation review and data reconstruction to replication,... |
| ⭐ Pricing Analyst | `specialized-pricing-analyst` | Análisis de márgenes y precios del catálogo. |
| Salesforce Architect | `specialized-salesforce-architect` | Solution architecture for Salesforce platform — multi-cloud design, integration patterns, governor limits, deployment strategy, and data model... |
| Strategy Duel Agent | `specialized-strategy-duel-agent` | Conducts live strategy duels using game theory and the 36 Chinese stratagems |
| Workflow Architect | `specialized-workflow-architect` | Workflow design specialist who maps complete workflow trees for every system, user journey, and agent interaction — covering happy paths, all... |
| Study Abroad Advisor | `study-abroad-advisor` | Full-spectrum study abroad planning expert covering the US, UK, Canada, Australia, Europe, Hong Kong, and Singapore — proficient in undergraduate,... |
| Supply Chain Strategist | `supply-chain-strategist` | Expert supply chain management and procurement strategy specialist — skilled in supplier development, strategic sourcing, quality control, and... |
| ZK Steward | `zk-steward` | "Knowledge-base steward in the spirit of Niklas Luhmann's Zettelkasten. |

---

## Marketing

Contenido, SEO, redes sociales, crecimiento y plataformas chinas.

| Agente | Slug | Qué hace |
|---|---|---|
| AEO Foundations Architect | `marketing-aeo-foundations` | Expert in AI Engine Optimization infrastructure — implements llms.txt, AI-aware robots.txt, token-budgeted content, structured Markdown... |
| Agentic Search Optimizer | `marketing-agentic-search-optimizer` | Expert in WebMCP readiness and agentic task completion — audits whether AI agents can actually accomplish tasks on your site (book, buy, register,... |
| AI Citation Strategist | `marketing-ai-citation-strategist` | Expert in AI recommendation engine optimization (AEO/GEO) — audits brand visibility across ChatGPT, Claude, Gemini, and Perplexity, identifies why... |
| App Store Optimizer | `marketing-app-store-optimizer` | Expert app store marketing specialist focused on App Store Optimization (ASO), conversion rate optimization, and app discoverability |
| Baidu SEO Specialist | `marketing-baidu-seo-specialist` | Expert Baidu search optimization specialist focused on Chinese search engine ranking, Baidu ecosystem integration, ICP compliance, Chinese keyword... |
| Bilibili Content Strategist | `marketing-bilibili-content-strategist` | Expert Bilibili marketing specialist focused on UP主 growth, danmaku culture mastery, B站 algorithm optimization, community building, and branded... |
| Book Co-Author | `marketing-book-co-author` | Strategic thought-leadership book collaborator for founders, experts, and operators turning voice notes, fragments, and positioning into... |
| Carousel Growth Engine | `marketing-carousel-growth-engine` | Autonomous TikTok and Instagram carousel generation specialist. |
| China E-Commerce Operator | `marketing-china-ecommerce-operator` | Expert China e-commerce operations specialist covering Taobao, Tmall, Pinduoduo, and JD ecosystems with deep expertise in product listing... |
| China Market Localization Strategist | `marketing-china-market-localization-strategist` | Full-stack China market localization expert who transforms real-time trend signals into executable go-to-market strategies across Douyin,... |
| ⭐ Content Creator | `marketing-content-creator` | Calendario editorial y copy multiplataforma. |
| ⭐ Cross-Border E-Commerce Specialist | `marketing-cross-border-ecommerce` | Operación de e-commerce, logística y optimización de listados. |
| Douyin Strategist | `marketing-douyin-strategist` | Short-video marketing expert specializing in the Douyin platform, with deep expertise in recommendation algorithm mechanics, viral video planning,... |
| ⭐ Email Marketing Strategist | `marketing-email-strategist` | Ciclo de vida por correo: carritos abandonados, recompra, reactivación. |
| Global Podcast Strategist | `marketing-global-podcast-strategist` | Expert podcast growth specialist focused on show positioning, audience development, content strategy, and monetisation. |
| ⭐ Growth Hacker | `marketing-growth-hacker` | Embudos de conversión y experimentación. |
| ⭐ Instagram Curator | `marketing-instagram-curator` | Contenido orgánico de Instagram, ahora que la cuenta existe. |
| Kuaishou Strategist | `marketing-kuaishou-strategist` | Expert Kuaishou marketing strategist specializing in short-video content for China's lower-tier city markets, live commerce operations, community... |
| LinkedIn Content Creator | `marketing-linkedin-content-creator` | Expert LinkedIn content strategist focused on thought leadership, personal brand building, and high-engagement professional content. |
| Livestream Commerce Coach | `marketing-livestream-commerce-coach` | Veteran livestream e-commerce coach specializing in host training and live room operations across Douyin, Kuaishou, Taobao Live, and Channels,... |
| Multi-Platform Publisher | `marketing-multi-platform-publisher` | Expert orchestrator for one-click Chinese blog publishing. |
| Podcast Strategist | `marketing-podcast-strategist` | Content strategy and operations expert for the Chinese podcast market, with deep expertise in Xiaoyuzhou, Ximalaya, and other major audio... |
| PR & Communications Manager | `marketing-pr-communications-manager` | Strategic public relations and communications specialist for media relations, press releases, crisis communications, executive thought leadership,... |
| Private Domain Operator | `marketing-private-domain-operator` | Expert in building enterprise WeChat (WeCom) private domain ecosystems, with deep expertise in SCRM systems, segmented community operations, Mini... |
| Reddit Community Builder | `marketing-reddit-community-builder` | Expert Reddit marketing specialist focused on authentic community engagement, value-driven content creation, and long-term relationship building. |
| ⭐ SEO Specialist | `marketing-seo-specialist` | SEO técnico y de contenido; cruza con la sección 27 del manual. |
| Short-Video Editing Coach | `marketing-short-video-editing-coach` | Hands-on short-video editing coach covering the full post-production pipeline, with mastery of CapCut Pro, Premiere Pro, DaVinci Resolve, and... |
| Social Media Strategist | `marketing-social-media-strategist` | Expert social media strategist for LinkedIn, Twitter, and professional platforms. |
| ⭐ TikTok Strategist | `marketing-tiktok-strategist` | Para cuando se abra la cuenta de TikTok (pendiente abierto). |
| Twitter Engager | `marketing-twitter-engager` | Expert Twitter marketing specialist focused on real-time engagement, thought leadership building, and community-driven growth. |
| Video Optimization Specialist | `marketing-video-optimization-specialist` | Video marketing strategist specializing in YouTube algorithm optimization, audience retention, chaptering, thumbnail concepts, and cross-platform... |
| WeChat Official Account Manager | `marketing-wechat-official-account` | Expert WeChat Official Account (OA) strategist specializing in content marketing, subscriber engagement, and conversion optimization. |
| Weibo Strategist | `marketing-weibo-strategist` | Full-spectrum operations expert for Sina Weibo, with deep expertise in trending topic mechanics, Super Topic community management, public... |
| X/Twitter Intelligence Analyst | `marketing-x-twitter-intelligence-analyst` | Social intelligence specialist for X/Twitter research, trend detection, account monitoring, and evidence-backed audience insights using public... |
| Xiaohongshu Specialist | `marketing-xiaohongshu-specialist` | Expert Xiaohongshu marketing specialist focused on lifestyle content, trend-driven strategies, and authentic community engagement. |
| Zhihu Strategist | `marketing-zhihu-strategist` | Expert Zhihu marketing specialist focused on thought leadership, community credibility, and knowledge-driven engagement. |

---

## Videojuegos

Unity, Unreal, Godot y Roblox — sin aplicación en esta tienda.

| Agente | Slug | Qué hace |
|---|---|---|
| Blender Add-on Engineer | `blender-addon-engineer` | Blender tooling specialist - Builds Python add-ons, asset validators, exporters, and pipeline automations that turn repetitive DCC work into... |
| Economy Designer | `economy-designer` | Virtual economy architect - Masters currency systems, sources and sinks, monetization modeling, inflation control, and data-driven economic... |
| Game Audio Engineer | `game-audio-engineer` | Interactive audio specialist - Masters FMOD/Wwise integration, adaptive music systems, spatial audio, and audio performance budgeting across all... |
| Game Designer | `game-designer` | Systems and mechanics architect - Masters GDD authorship, player psychology, economy balancing, and gameplay loop design across all engines and genres |
| Godot Gameplay Scripter | `godot-gameplay-scripter` | Composition and signal integrity specialist - Masters GDScript 2.0, C# integration, node-based architecture, and type-safe signal design for Godot... |
| Godot Multiplayer Engineer | `godot-multiplayer-engineer` | Godot 4 networking specialist - Masters the MultiplayerAPI, scene replication, ENet/WebRTC transport, RPCs, and authority models for real-time... |
| Godot Shader Developer | `godot-shader-developer` | Godot 4 visual effects specialist - Masters the Godot Shading Language (GLSL-like), VisualShader editor, CanvasItem and Spatial shaders,... |
| Level Designer | `level-designer` | Spatial storytelling and flow specialist - Masters layout theory, pacing architecture, encounter design, and environmental narrative across all... |
| Narrative Designer | `narrative-designer` | Story systems and dialogue architect - Masters GDD-aligned narrative design, branching dialogue, lore architecture, and environmental storytelling... |
| Roblox Avatar Creator | `roblox-avatar-creator` | Roblox UGC and avatar pipeline specialist - Masters Roblox's avatar system, UGC item creation, accessory rigging, texture standards, and the... |
| Roblox Experience Designer | `roblox-experience-designer` | Roblox platform UX and monetization specialist - Masters engagement loop design, DataStore-driven progression, Roblox monetization systems... |
| Roblox Systems Scripter | `roblox-systems-scripter` | Roblox platform engineering specialist - Masters Luau, the client-server security model, RemoteEvents/RemoteFunctions, DataStore, and module... |
| Technical Artist | `technical-artist` | Art-to-engine pipeline specialist - Masters shaders, VFX systems, LOD pipelines, performance budgeting, and cross-engine asset optimization |
| Unity Architect | `unity-architect` | Data-driven modularity specialist - Masters ScriptableObjects, decoupled systems, and single-responsibility component design for scalable Unity... |
| Unity Editor Tool Developer | `unity-editor-tool-developer` | Unity editor automation specialist - Masters custom EditorWindows, PropertyDrawers, AssetPostprocessors, ScriptedImporters, and pipeline... |
| Unity Multiplayer Engineer | `unity-multiplayer-engineer` | Networked gameplay specialist - Masters Netcode for GameObjects, Unity Gaming Services (Relay/Lobby), client-server authority, lag compensation,... |
| Unity Shader Graph Artist | `unity-shader-graph-artist` | Visual effects and material specialist - Masters Unity Shader Graph, HLSL, URP/HDRP rendering pipelines, and custom pass authoring for real-time... |
| Unreal Multiplayer Architect | `unreal-multiplayer-architect` | Unreal Engine networking specialist - Masters Actor replication, GameMode/GameState architecture, server-authoritative gameplay, network... |
| Unreal Systems Engineer | `unreal-systems-engineer` | Performance and hybrid architecture specialist - Masters C++/Blueprint continuum, Nanite geometry, Lumen GI, and Gameplay Ability System for... |
| Unreal Technical Artist | `unreal-technical-artist` | Unreal Engine visual pipeline specialist - Masters the Material Editor, Niagara VFX, Procedural Content Generation, and the art-to-engine pipeline... |
| Unreal World Builder | `unreal-world-builder` | Open-world and environment specialist - Masters UE5 World Partition, Landscape, procedural foliage, HLOD, and large-scale level streaming for... |

---

## GIS / geoespacial

Mapas, datos espaciales y percepción remota — sin aplicación aquí.

| Agente | Slug | Qué hace |
|---|---|---|
| 3D & Scene Developer | `gis-3d-scene-developer` | Web 3D visualization specialist who creates immersive 3D scenes, terrain models, point cloud visualizations, and interactive web experiences using... |
| GIS Analyst | `gis-analyst` | Day-to-day GIS operator who creates maps, manages layers, performs spatial queries, and maintains geospatial data integrity across desktop and web... |
| BIM/GIS Specialist | `gis-bim-specialist` | Integration specialist who bridges Building Information Modeling and Geographic Information Systems — Revit/IFC data conversion, indoor mapping,... |
| Cartography Designer | `gis-cartography-designer` | Map aesthetics specialist who designs beautiful, readable, and effective maps — color theory, typography, label placement, basemap selection, and... |
| Drone/Reality Mapping Specialist | `gis-drone-reality-mapping` | Photogrammetry and reality capture expert who processes drone imagery into orthomosaics, digital terrain models, point clouds, and 3D meshes —... |
| GeoAI/ML Engineer | `gis-geoai-ml-engineer` | Geospatial machine learning specialist who builds models for feature extraction, object detection, image segmentation, and land cover... |
| Geoprocessing Specialist | `gis-geoprocessing-specialist` | ArcPy and Python toolbox expert who automates spatial workflows — builds .pyt toolboxes, Model Builder processes, batch geoprocessing automation,... |
| GIS QA Engineer | `gis-qa-engineer` | Quality assurance specialist who validates geospatial data integrity — topology checks, metadata audits, CRS consistency, accuracy assessment, and... |
| Solution Engineer | `gis-solution-engineer` | Hands-on GIS prototype builder who takes strategy from Technical Consultant and turns it into working demos, proof-of-concepts, and technical... |
| Spatial Data Engineer | `gis-spatial-data-engineer` | ETL specialist who transforms messy geospatial data from any source into clean, standardized, production-ready datasets — format conversion, CRS... |
| Spatial Data Scientist | `gis-spatial-data-scientist` | Advanced spatial analytics specialist who applies statistical modeling, spatial econometrics, clustering, and predictive analytics to geospatial... |
| Technical Consultant | `gis-technical-consultant` | Strategic GIS advisor who translates business problems into geospatial solutions — gap analysis, technology roadmaps, RFP responses, and digital... |
| Web GIS Developer | `gis-web-gis-developer` | Full-stack web GIS engineer who builds interactive mapping applications — MapLibre GL JS, ArcGIS JS API, Leaflet, real-time dashboards, REST API... |

---

## Seguridad

Auditoría, respuesta a incidentes, cumplimiento y seguridad de aplicaciones.

| Agente | Slug | Qué hace |
|---|---|---|
| AI-Generated Code Security Auditor | `security-ai-generated-code-auditor` | Security reviewer for AI-generated and vibe-coded apps — hunts the hardcoded secrets, broken row-level security, and prompt-injection sinks that... |
| Application Security Engineer | `security-appsec-engineer` | AppSec specialist who secures the software development lifecycle through threat modeling, secure code review, SAST/DAST integration, and developer... |
| Security Architect | `security-architect` | Expert security architect specializing in threat modeling, secure-by-design architecture, trust-boundary analysis, defense-in-depth, and... |
| Blockchain Security Auditor | `security-blockchain-security-auditor` | Expert smart contract security auditor specializing in vulnerability detection, formal verification, exploit analysis, and comprehensive audit... |
| Cloud Security Architect | `security-cloud-security-architect` | Cloud-native security specialist designing zero trust architectures, implementing defense-in-depth across AWS, Azure, and GCP, and securing... |
| Compliance Auditor | `security-compliance-auditor` | Expert technical compliance auditor specializing in SOC 2, ISO 27001, HIPAA, and PCI-DSS audits — from readiness assessment through evidence... |
| Incident Responder | `security-incident-responder` | Digital forensics and incident response specialist who leads breach investigations, contains active threats, coordinates crisis response, and... |
| Penetration Tester | `security-penetration-tester` | Offensive security specialist conducting authorized penetration tests, red team operations, and vulnerability assessments across networks, web... |
| Secrets & Credential Hygiene Engineer | `security-secrets-credential-engineer` | Owns the full lifecycle of secrets and credentials — detection, prevention, vaulting, rotation, and leak response — so an application runs on... |
| Senior SecOps Engineer | `security-senior-secops` | Defensive application security specialist who scans every code submission for secrets and sensitive data exposure before anything else, then... |
| Threat Detection Engineer | `security-threat-detection-engineer` | Expert detection engineer specializing in SIEM rule development, MITRE ATT&CK coverage mapping, threat hunting, alert tuning, and... |
| Threat Intelligence Analyst | `security-threat-intelligence-analyst` | Cyber threat intelligence specialist who tracks adversary groups, maps attack campaigns to MITRE ATT&CK, produces actionable intelligence reports,... |

---

## Diseño

Interfaz, experiencia de usuario, marca y accesibilidad.

| Agente | Slug | Qué hace |
|---|---|---|
| Brand Guardian | `design-brand-guardian` | Expert brand strategist and guardian specializing in brand identity development, consistency maintenance, and strategic brand positioning |
| Image Prompt Engineer | `design-image-prompt-engineer` | Expert photography prompt engineer specializing in crafting detailed, evocative prompts for AI image generation. |
| Inclusive Visuals Specialist | `design-inclusive-visuals-specialist` | Representation expert who defeats systemic AI biases to generate culturally accurate, affirming, and non-stereotypical images and video. |
| Persona Walkthrough Specialist | `design-persona-walkthrough` | Simulate cognitive walkthroughs of web pages from a defined persona's psychological perspective — captures emotional reactions and rational... |
| UI Designer | `design-ui-designer` | Expert UI designer specializing in visual design systems, component libraries, and pixel-perfect interface creation. |
| UI Finish-Gate Reviewer | `design-ui-finish-gate-reviewer` | Product-interface reviewer who catches generic, interchangeable UI before it ships by grounding critique in real product evidence, a written... |
| UX Architect | `design-ux-architect` | Technical architecture and UX specialist who provides developers with solid foundations, CSS systems, and clear implementation guidance |
| ⭐ UX Researcher | `design-ux-researcher` | Investigación de usabilidad sobre el embudo real de la tienda. |
| Visual Storyteller | `design-visual-storyteller` | Expert visual communication specialist focused on creating compelling visual narratives, multimedia content, and brand storytelling through design. |
| Whimsy Injector | `design-whimsy-injector` | Expert creative specialist focused on adding personality, delight, and playful elements to brand experiences. |

---

## Ventas

Prospección, calificación de oportunidades y gestión de cuentas B2B.

| Agente | Slug | Qué hace |
|---|---|---|
| Account Strategist | `sales-account-strategist` | Expert post-sale account strategist specializing in land-and-expand execution, stakeholder mapping, QBR facilitation, and net revenue retention. |
| Sales Coach | `sales-coach` | Expert sales coaching specialist focused on rep development, pipeline review facilitation, call coaching, deal strategy, and forecast accuracy. |
| Deal Strategist | `sales-deal-strategist` | Senior deal strategist specializing in MEDDPICC qualification, competitive positioning, and win planning for complex B2B sales cycles. |
| Discovery Coach | `sales-discovery-coach` | Coaches sales teams on elite discovery methodology — question design, current-state mapping, gap quantification, and call structure that surfaces... |
| Sales Engineer | `sales-engineer` | Senior pre-sales engineer specializing in technical discovery, demo engineering, POC scoping, competitive battlecards, and bridging product... |
| Offer & Lead Gen Strategist | `sales-offer-lead-gen-strategist` | Top-of-funnel architect who designs irresistible offers and lead magnets that attract qualified buyers at scale. |
| Outbound Strategist | `sales-outbound-strategist` | Signal-based outbound specialist who designs multi-channel prospecting sequences, defines ICPs, and builds pipeline through research-driven... |
| Pipeline Analyst | `sales-pipeline-analyst` | Revenue operations analyst specializing in pipeline health diagnostics, deal velocity analysis, forecast accuracy, and data-driven sales coaching. |
| Proposal Strategist | `sales-proposal-strategist` | Strategic proposal architect who transforms RFPs and sales opportunities into compelling win narratives. |

---

## Pruebas y QA

Automatización de pruebas, rendimiento y verificación con evidencia.

| Agente | Slug | Qué hace |
|---|---|---|
| Accessibility Auditor | `testing-accessibility-auditor` | Expert accessibility specialist who audits interfaces against WCAG standards, tests with assistive technologies, and ensures inclusive design. |
| API Tester | `testing-api-tester` | Expert API testing specialist focused on comprehensive API validation, performance testing, and quality assurance across all systems and... |
| Evidence Collector | `testing-evidence-collector` | Screenshot-obsessed, fantasy-allergic QA specialist - Default to finding 3-5 issues, requires visual proof for everything |
| Performance Benchmarker | `testing-performance-benchmarker` | Expert performance testing and optimization specialist focused on measuring, analyzing, and improving system performance across all applications... |
| Reality Checker | `testing-reality-checker` | Stops fantasy approvals, evidence-based certification - Default to "NEEDS WORK", requires overwhelming proof for production readiness |
| Test Automation Engineer | `testing-test-automation-engineer` | Expert end-to-end test automation engineer for Playwright and Cypress — resilient selectors, flake elimination, isolated test data, CI... |
| Test Results Analyzer | `testing-test-results-analyzer` | Expert test analysis specialist focused on comprehensive test result evaluation, quality metrics analysis, and actionable insight generation from... |
| Tool Evaluator | `testing-tool-evaluator` | Expert technology assessment specialist focused on evaluating, testing, and recommending tools, software, and platforms for business use and... |
| Workflow Optimizer | `testing-workflow-optimizer` | Expert process improvement specialist focused on analyzing, optimizing, and automating workflows across all business functions for maximum... |

---

## Gestión de proyectos

Coordinación, sprints, experimentos y operaciones de estudio.

| Agente | Slug | Qué hace |
|---|---|---|
| Experiment Tracker | `project-management-experiment-tracker` | Expert project manager specializing in experiment design, execution tracking, and data-driven decision making. |
| Jira Workflow Steward | `project-management-jira-workflow-steward` | Expert delivery operations specialist who enforces Jira-linked Git workflows, traceable commits, structured pull requests, and release-safe branch... |
| Meeting Notes Specialist | `project-management-meeting-notes-specialist` | Extract structured decisions, action items, and open questions from meeting transcripts or rough notes into a clean 4-section summary. |
| Project Shepherd | `project-management-project-shepherd` | Expert project manager specializing in cross-functional project coordination, timeline management, and stakeholder alignment. |
| Studio Operations | `project-management-studio-operations` | Expert operations manager specializing in day-to-day studio efficiency, process optimization, and resource coordination. |
| Studio Producer | `project-management-studio-producer` | Senior strategic leader specializing in high-level creative and technical project orchestration, resource allocation, and multi-project portfolio... |
| Senior Project Manager | `project-manager-senior` | Converts specs to tasks and remembers previous projects. |

---

## Publicidad pagada

**La división que aplica directamente a la campaña de Meta.**

| Agente | Slug | Qué hace |
|---|---|---|
| ⭐ Paid Media Auditor | `paid-media-auditor` | Auditoría de cuenta por checkpoints — útil del día 7 en adelante. |
| ⭐ Ad Creative Strategist | `paid-media-creative-strategist` | Iteración de creativos y copy más allá de la v2. |
| ⭐ Paid Social Strategist | `paid-media-paid-social-strategist` | Embudo completo en Meta: prospección → retargeting. El hueco actual de la campaña. |
| PPC Campaign Strategist | `paid-media-ppc-strategist` | Senior paid media strategist specializing in large-scale search, shopping, and performance max campaign architecture across Google, Microsoft, and... |
| Programmatic & Display Buyer | `paid-media-programmatic-buyer` | Display advertising and programmatic media buying specialist covering managed placements, Google Display Network, DV360, trade desk platforms,... |
| Search Query Analyst | `paid-media-search-query-analyst` | Specialist in search term analysis, negative keyword architecture, and query-to-intent mapping. |
| ⭐ Tracking & Measurement Specialist | `paid-media-tracking-specialist` | Pixel, CAPI y atribución. Toca el problema de optimizar a PURCHASE sin compras. |

---

## Académicos

Historia, psicología, estadística, narratología, antropología, geografía.

| Agente | Slug | Qué hace |
|---|---|---|
| Anthropologist | `academic-anthropologist` | Expert in cultural systems, rituals, kinship, belief systems, and ethnographic method — builds culturally coherent societies that feel lived-in... |
| Geographer | `academic-geographer` | Expert in physical and human geography, climate systems, cartography, and spatial analysis — builds geographically coherent worlds where terrain,... |
| Historian | `academic-historian` | Expert in historical analysis, periodization, material culture, and historiography — validates historical coherence and enriches settings with... |
| Narratologist | `academic-narratologist` | Expert in narrative theory, story structure, character arcs, and literary analysis — grounds advice in established frameworks from Propp to... |
| Psychologist | `academic-psychologist` | Expert in human behavior, personality theory, motivation, and cognitive patterns — builds psychologically credible characters and interactions... |
| Statistician | `academic-statistician` | Expert in quantitative research methodology, experimental design, and statistical inference — pressure-tests claims, designs sound studies, and... |

---

## Soporte

Atención a clientes, devoluciones, onboarding y servicio.

| Agente | Slug | Qué hace |
|---|---|---|
| Analytics Reporter | `support-analytics-reporter` | Expert data analyst transforming raw data into actionable business insights. |
| Executive Summary Generator | `support-executive-summary-generator` | Consultant-grade AI specialist trained to think and communicate like a senior strategy consultant. |
| Finance Tracker | `support-finance-tracker` | Expert financial analyst and controller specializing in financial planning, budget management, and business performance analysis. |
| Infrastructure Maintainer | `support-infrastructure-maintainer` | Expert infrastructure specialist focused on system reliability, performance optimization, and technical operations management. |
| Legal Compliance Checker | `support-legal-compliance-checker` | Expert legal and compliance specialist ensuring business operations, data handling, and content creation comply with relevant laws, regulations,... |
| Support Responder | `support-support-responder` | Expert customer support specialist delivering exceptional customer service, issue resolution, and user experience optimization. |

---

## Cómputo espacial

AR/VR/XR y visionOS — sin aplicación aquí.

| Agente | Slug | Qué hace |
|---|---|---|
| macOS Spatial/Metal Engineer | `macos-spatial-metal-engineer` | Native Swift and Metal specialist building high-performance 3D rendering systems and spatial computing experiences for macOS and Vision Pro |
| Terminal Integration Specialist | `terminal-integration-specialist` | Terminal emulation, text rendering optimization, and SwiftTerm integration for modern Swift applications |
| visionOS Spatial Engineer | `visionos-spatial-engineer` | Native visionOS spatial computing, SwiftUI volumetric interfaces, and Liquid Glass design implementation |
| XR Cockpit Interaction Specialist | `xr-cockpit-interaction-specialist` | Specialist in designing and developing immersive cockpit-based control systems for XR environments |
| XR Immersive Developer | `xr-immersive-developer` | Expert WebXR and immersive technology developer with specialization in browser-based AR/VR/XR applications |
| XR Interface Architect | `xr-interface-architect` | Spatial interaction designer and interface strategist for immersive AR/VR/XR environments |

---

## Finanzas

Contabilidad, FP&A, precios, impuestos e inversión.

| Agente | Slug | Qué hace |
|---|---|---|
| Bookkeeper & Controller | `finance-bookkeeper-controller` | Expert bookkeeper and controller specializing in day-to-day accounting operations, financial reconciliations, month-end close processes, and... |
| Financial Analyst | `finance-financial-analyst` | Expert financial analyst specializing in financial modeling, forecasting, scenario analysis, and data-driven decision support. |
| FP&A Analyst | `finance-fpa-analyst` | Expert Financial Planning & Analysis (FP&A) analyst specializing in budgeting, variance analysis, financial planning, rolling forecasts, and... |
| Investment Researcher | `finance-investment-researcher` | Expert investment researcher specializing in market research, due diligence, portfolio analysis, and asset valuation. |
| Tax Strategist | `finance-tax-strategist` | Expert tax strategist specializing in tax optimization, multi-jurisdictional compliance, transfer pricing, and strategic tax planning. |

---

## Producto

Gestión de producto, priorización y síntesis de feedback.

| Agente | Slug | Qué hace |
|---|---|---|
| Behavioral Nudge Engine | `product-behavioral-nudge-engine` | Behavioral psychology specialist that adapts software interaction cadences and styles to maximize user motivation and success. |
| Feedback Synthesizer | `product-feedback-synthesizer` | Expert in collecting, analyzing, and synthesizing user feedback from multiple channels to extract actionable product insights. |
| Product Manager | `product-manager` | Holistic product leader who owns the full product lifecycle — from discovery and strategy through roadmap, stakeholder alignment, go-to-market,... |
| Sprint Prioritizer | `product-sprint-prioritizer` | Expert product manager specializing in agile sprint planning, feature prioritization, and resource allocation. |
| Trend Researcher | `product-trend-researcher` | Expert market intelligence analyst specializing in identifying emerging trends, competitive analysis, and opportunity assessment. |

---

## Salud

Facturación médica, cumplimiento clínico y sistemas de salud — sin aplicación aquí.

| Agente | Slug | Qué hace |
|---|---|---|
| Clinical Evidence Agent | `healthcare-clinical-evidence-agent` | Evidence standards and clinical credibility framework for AI agents |
| Healthcare Innovation Strategist | `healthcare-innovation-strategist` | Strategic narrative architect for healthcare founders operating at |
| Sovereign Health Systems Agent | `healthcare-sovereign-health-systems-agent` | Government health mandate engagement framework for AI agents |
