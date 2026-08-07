# Graph Report - .  (2026-08-07)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 452 nodes · 697 edges · 37 communities (20 shown, 17 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.7)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7e40cffa`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22
- Community 23
- Community 25
- Community 27
- Community 30
- Community 31
- Community 32
- Community 33
- Community 34
- Community 35

## God Nodes (most connected - your core abstractions)
1. `PredictiveSearch` - 23 edges
2. `FacetFiltersForm` - 20 edges
3. `SlideshowComponent` - 16 edges
4. `CartItems` - 15 edges
5. `CartDrawer` - 11 edges
6. `MenuDrawer` - 11 edges
7. `BulkAdd` - 10 edges
8. `CartNotification` - 9 edges
9. `CustomerAddresses` - 9 edges
10. `handleUpdateProductInfo()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `show()` --calls--> `preprocessHTML()`  [EXTRACTED]
  tema-shopify/assets/quick-add.js → tema-shopify/assets/quick-add.js  _Bridges community 1 → community 17_

## Import Cycles
- None detected.

## Communities (37 total, 17 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (14): AccountIcon, BulkModal, DeferredMedia, getFocusableElements(), HeaderDrawer, MenuDrawer, ModalDialog, ModalOpener (+6 more)

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (23): HTMLUpdateUtility, SectionId, buildRequestUrlWithParams(), connectedCallback(), fetchQuantityRules(), getSelectedVariant(), handleOptionValueChange(), handleSwapProduct() (+15 more)

### Community 2 - "Community 2"
Cohesion: 0.11
Nodes (6): CartItems, CartRemoveButton, constructor(), CartPerformance, handleErrorMessage(), onSubmitHandler()

### Community 3 - "Community 3"
Cohesion: 0.12
Nodes (24): cleanErrorMessageOnType(), connectedCallback(), constructor(), getSectionsToRender(), getTotalBar(), handleScrollIntoView(), handleSwitchVariantOnEnter(), initEventListeners() (+16 more)

### Community 7 - "Community 7"
Cohesion: 0.19
Nodes (3): CartDrawer, CartDrawerItems, onKeyUpEscape()

### Community 9 - "Community 9"
Cohesion: 0.26
Nodes (10): connectedCallback(), constructor(), getSectionsToRender(), getSectionsUrl(), listenForActiveInput(), listenForKeydown(), onCartUpdate(), renderSections() (+2 more)

### Community 10 - "Community 10"
Cohesion: 0.21
Nodes (7): closeSelector(), filterCountries(), hidePanel(), normalizeString(), onContainerKeyUp(), openSelector(), resetFilter()

### Community 11 - "Community 11"
Cohesion: 0.31
Nodes (12): clearErrorMessage(), clearInputFields(), connectedCallback(), constructor(), createErrorListItem(), disableableFields(), disableInputFields(), displayErrorMessage() (+4 more)

### Community 12 - "Community 12"
Cohesion: 0.24
Nodes (3): attributes, CustomerAddresses, selectors

### Community 14 - "Community 14"
Cohesion: 0.38
Nodes (9): constructor(), fetchAvailability(), handleBodyClick(), hide(), onClickRefreshList(), renderError(), renderPreview(), show() (+1 more)

### Community 16 - "Community 16"
Cohesion: 0.39
Nodes (8): announceLiveRegion(), constructor(), onSlideChanged(), playActiveMedia(), preventStickyHeader(), removeListSemantic(), setActiveMedia(), setActiveThumbnail()

### Community 17 - "Community 17"
Cohesion: 0.36
Nodes (6): preprocessHTML(), preventDuplicatedIDs(), preventVariantURLSwitching(), removeDOMElements(), removeGalleryListSemantic(), updateImageSizes()

### Community 20 - "Community 20"
Cohesion: 0.43
Nodes (6): connectedCallback(), constructor(), getCartQuantity(), getVolumePricingArray(), onInputChange(), updatePricePerItem()

### Community 21 - "Community 21"
Cohesion: 0.57
Nodes (6): createOverlay(), enableZoomOnHover(), magnify(), moveWithHover(), prepareOverlay(), toggleLoadingSpinner()

### Community 25 - "Community 25"
Cohesion: 0.60
Nodes (4): initializeScrollAnimationTrigger(), initializeScrollZoomAnimationTrigger(), onIntersection(), percentageSeen()

## Knowledge Gaps
- **5 isolated node(s):** `PUB_SUB_EVENTS`, `selectors`, `attributes`, `trapFocusHandlers`, `subscribers`
  These have ≤1 connection - possible missing edges or undocumented components.
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `onKeyUpEscape()` connect `Community 7` to `Community 0`, `Community 4`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Why does `CartPerformance` connect `Community 2` to `Community 0`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **What connects `PUB_SUB_EVENTS`, `selectors`, `attributes` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05389610389610389 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.09009009009009009 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.11494252873563218 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.12183908045977011 - nodes in this community are weakly interconnected._