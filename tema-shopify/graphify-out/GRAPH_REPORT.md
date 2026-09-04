# Graph Report - tema-shopify  (2026-09-04)

## Corpus Check
- 110 files · ~240,570 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 463 nodes · 696 edges · 50 communities (16 shown, 28 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `44c2b880`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- MenuDrawer
- product-info.js
- CartItems
- quick-order-list.js
- FacetFiltersForm
- SlideshowComponent
- PredictiveSearch
- CartDrawer
- BulkAdd
- quick-add-bulk.js
- localization-form.js
- recipient-form.js
- CustomerAddresses
- CartNotification
- pickup-availability.js
- DetailsDisclosure
- media-gallery.js
- quick-add.js
- DetailsModal
- MainSearch
- price-per-item.js
- magnify.js
- SearchForm
- PriceRange
- animations.js
- product-modal.js
- intemperie-motion.js
- pubsub.js
- quantity-popover.js
- imx-shuffle.js
- PasswordModal
- show-more.js
- constants.js
- QuantityInput
- imx-related-diversify.js
- ModalDialog
- global.js
- VariantSelects
- product-form.js
- CartPerformance
- ProductRecommendations
- AccountIcon
- SectionId
- HTMLUpdateUtility

## God Nodes (most connected - your core abstractions)
1. `PredictiveSearch` - 23 edges
2. `FacetFiltersForm` - 20 edges
3. `SlideshowComponent` - 17 edges
4. `CartItems` - 15 edges
5. `MenuDrawer` - 12 edges
6. `CartDrawer` - 11 edges
7. `BulkAdd` - 10 edges
8. `CartNotification` - 9 edges
9. `CustomerAddresses` - 9 edges
10. `SliderComponent` - 9 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (50 total, 28 thin omitted)

### Community 0 - "MenuDrawer"
Cohesion: 0.17
Nodes (6): getFocusableElements(), HeaderDrawer, MenuDrawer, addTrapFocus(), removeTrapFocus(), trapFocus()

### Community 1 - "product-info.js"
Cohesion: 0.12
Nodes (18): buildRequestUrlWithParams(), connectedCallback(), fetchQuantityRules(), getSelectedVariant(), handleOptionValueChange(), handleSwapProduct(), handleUpdateProductInfo(), initializeProductSwapUtility() (+10 more)

### Community 3 - "quick-order-list.js"
Cohesion: 0.12
Nodes (24): cleanErrorMessageOnType(), connectedCallback(), constructor(), getSectionsToRender(), getTotalBar(), handleScrollIntoView(), handleSwitchVariantOnEnter(), initEventListeners() (+16 more)

### Community 7 - "CartDrawer"
Cohesion: 0.19
Nodes (3): CartDrawer, CartDrawerItems, onKeyUpEscape()

### Community 9 - "quick-add-bulk.js"
Cohesion: 0.26
Nodes (10): connectedCallback(), constructor(), getSectionsToRender(), getSectionsUrl(), listenForActiveInput(), listenForKeydown(), onCartUpdate(), renderSections() (+2 more)

### Community 10 - "localization-form.js"
Cohesion: 0.21
Nodes (7): closeSelector(), filterCountries(), hidePanel(), normalizeString(), onContainerKeyUp(), openSelector(), resetFilter()

### Community 11 - "recipient-form.js"
Cohesion: 0.31
Nodes (12): clearErrorMessage(), clearInputFields(), connectedCallback(), constructor(), createErrorListItem(), disableableFields(), disableInputFields(), displayErrorMessage() (+4 more)

### Community 12 - "CustomerAddresses"
Cohesion: 0.24
Nodes (3): attributes, CustomerAddresses, selectors

### Community 14 - "pickup-availability.js"
Cohesion: 0.38
Nodes (9): constructor(), fetchAvailability(), handleBodyClick(), hide(), onClickRefreshList(), renderError(), renderPreview(), show() (+1 more)

### Community 16 - "media-gallery.js"
Cohesion: 0.39
Nodes (8): announceLiveRegion(), constructor(), onSlideChanged(), playActiveMedia(), preventStickyHeader(), removeListSemantic(), setActiveMedia(), setActiveThumbnail()

### Community 17 - "quick-add.js"
Cohesion: 0.33
Nodes (7): preprocessHTML(), preventDuplicatedIDs(), preventVariantURLSwitching(), removeDOMElements(), removeGalleryListSemantic(), show(), updateImageSizes()

### Community 20 - "price-per-item.js"
Cohesion: 0.43
Nodes (6): connectedCallback(), constructor(), getCartQuantity(), getVolumePricingArray(), onInputChange(), updatePricePerItem()

### Community 21 - "magnify.js"
Cohesion: 0.57
Nodes (6): createOverlay(), enableZoomOnHover(), magnify(), moveWithHover(), prepareOverlay(), toggleLoadingSpinner()

### Community 25 - "animations.js"
Cohesion: 0.60
Nodes (4): initializeScrollAnimationTrigger(), initializeScrollZoomAnimationTrigger(), onIntersection(), percentageSeen()

### Community 38 - "imx-related-diversify.js"
Cohesion: 0.83
Nodes (3): pickDiverse(), run(), shuffle()

### Community 41 - "ModalDialog"
Cohesion: 0.24
Nodes (4): DeferredMedia, ModalDialog, ModalOpener, pauseAllMedia()

## Knowledge Gaps
- **5 isolated node(s):** `PUB_SUB_EVENTS`, `selectors`, `attributes`, `trapFocusHandlers`, `subscribers`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 116 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **28 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `onKeyUpEscape()` connect `CartDrawer` to `global.js`, `FacetFiltersForm`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Why does `SlideshowComponent` connect `SlideshowComponent` to `global.js`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **What connects `PUB_SUB_EVENTS`, `selectors`, `attributes` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `product-info.js` be split into smaller, more focused modules?**
  _Cohesion score 0.11576354679802955 - nodes in this community are weakly interconnected._
- **Should `quick-order-list.js` be split into smaller, more focused modules?**
  _Cohesion score 0.12183908045977011 - nodes in this community are weakly interconnected._