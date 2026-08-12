# Graph Report - tema-shopify  (2026-08-12)

## Corpus Check
- 109 files · ~239,820 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 460 nodes · 705 edges · 40 communities (22 shown, 18 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.7)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b0dc2d6c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- global.js
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
- pubsub.js
- quantity-popover.js
- imx-shuffle.js
- PasswordModal
- show-more.js
- constants.js
- QuantityInput
- imx-related-diversify.js

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
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (40 total, 18 thin omitted)

### Community 0 - "global.js"
Cohesion: 0.06
Nodes (14): AccountIcon, BulkModal, DeferredMedia, getFocusableElements(), HeaderDrawer, MenuDrawer, ModalDialog, ModalOpener (+6 more)

### Community 1 - "product-info.js"
Cohesion: 0.09
Nodes (22): HTMLUpdateUtility, SectionId, buildRequestUrlWithParams(), connectedCallback(), fetchQuantityRules(), getSelectedVariant(), handleOptionValueChange(), handleSwapProduct() (+14 more)

### Community 2 - "CartItems"
Cohesion: 0.11
Nodes (6): CartItems, CartRemoveButton, constructor(), CartPerformance, handleErrorMessage(), onSubmitHandler()

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

## Knowledge Gaps
- **5 isolated node(s):** `PUB_SUB_EVENTS`, `selectors`, `attributes`, `trapFocusHandlers`, `subscribers`
  These have ≤1 connection - possible missing edges or undocumented components.
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `onKeyUpEscape()` connect `CartDrawer` to `global.js`, `FacetFiltersForm`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Why does `CartPerformance` connect `CartItems` to `global.js`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **What connects `PUB_SUB_EVENTS`, `selectors`, `attributes` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `global.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05660377358490566 - nodes in this community are weakly interconnected._
- **Should `product-info.js` be split into smaller, more focused modules?**
  _Cohesion score 0.09365079365079365 - nodes in this community are weakly interconnected._
- **Should `CartItems` be split into smaller, more focused modules?**
  _Cohesion score 0.11494252873563218 - nodes in this community are weakly interconnected._
- **Should `quick-order-list.js` be split into smaller, more focused modules?**
  _Cohesion score 0.12183908045977011 - nodes in this community are weakly interconnected._