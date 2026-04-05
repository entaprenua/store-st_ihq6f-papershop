# Product Components Architecture

## Overview

This directory contains zero-code ready product components for the visual builder. Components are designed to be fully composable - users can include/exclude sections by simply adding/removing child components.

## Design Principles

1. **Zero-Code Ready** - All components work without manual setup; just drop them in and configure via props
2. **Composable** - Sections are separate components that can be included/excluded via children
3. **Auto-Fetching** - Components fetch their own data when given storeId/productId
4. **Enterprise-Ready** - Full TypeScript types, error handling, loading states, accessibility
5. **Server-Aligned** - All server endpoints and filters are supported

## Server API Alignment

### Endpoints (from productsApi)

| Endpoint | Usage |
|----------|-------|
| `GET /stores/:storeId/products` | ProductList - getAll with pagination/filters |
| `GET /stores/:storeId/products/:id` | ProductRoot - getById |
| `GET /stores/:storeId/products/category/:categoryId` | ProductList by category |
| `GET /stores/:storeId/products/search` | ProductList search |

### Filters (ProductFilters)

| Filter | Type | Description |
|--------|------|-------------|
| `status` | `"in_stock" \| "low_stock" \| "out_of_stock" \| "not_tracked"` | Stock status |
| `visibility` | `"public" \| "private" \| "draft"` | Visibility |
| `categoryId` | `string` | Category filter |
| `minPrice` | `number` | Minimum price |
| `maxPrice` | `number` | Maximum price |
| `sortBy` | `"name" \| "price" \| "stockQuantity" \| "visibility" \| "createdAt"` | Sort field |
| `sortOrder` | `"asc" \| "desc"` | Sort direction |

### Product Fields (from Product type with slug)

```typescript
interface Product {
  id: string
  storeId: string
  name: string
  slug: string | null  // SEO-friendly URL identifier
  price: string | null
  compareToPrice: string | null
  image: string | null
  description: string | null
  visibility: string | null
  media: Record<string, string> | null
  metadata: Record<string, string> | null
  sku: string | null
  stockQuantity: number
  reservedQuantity: number
  trackInventory: boolean
  allowBackorder: boolean
  lowStockThreshold: number
  outOfStockThreshold: number
  isDeleted: boolean
  version: number
  insertedAt: string
  updatedAt: string
}
```

## Directory Structure

```
components/ui/product/
├── STRUCTURE.md              # This file
├── index.ts                  # Barrel exports
├── product-context.tsx       # React context for product state
├── product-root.tsx          # Main Product component with auto-fetch
├── product-sections.tsx      # All product section components
├── product-list.tsx          # ProductList + ProductListView
├── product-search.tsx        # ProductSearch + ProductSearchProvider
└── product-skeleton.tsx     # Loading skeleton components
```

## Data Sources (ProductRoot)

ProductRoot resolves product data from multiple sources in priority order:

1. **Explicit data** - `data` prop passed directly
2. **Collection item** - From `CollectionItemContext` (within Collection)
3. **Search item** - From `SearchItemContext` (within Search)
4. **Explicit fetch** - `storeId` + `productSlug` props

```typescript
// Resolution order
const resolvedData = () => {
  if (local.data) return local.data                    // 1. Explicit data
  if (collectionItem?.item) return collectionItem.item  // 2. Collection item
  if (searchItem?.item) return searchItem.item         // 3. Search item
  return undefined                                      // 4. Falls to fetch
}
```

## Component Hierarchy

```
ProductRoot (resolves data from multiple sources)
├── ProductProvider (context)
│   └── ProductWrapper (uses useProduct for href resolution)
│       └── children (user-provided sections)
│           ├── ProductImage
│           ├── ProductName
│           ├── ProductDescription
│           ├── ProductPrice
│           ├── ProductComparePrice
│           ├── ProductMedia (gallery)
│           ├── ProductStockBadge
│           ├── ProductAddToCartTrigger
│           ├── ProductRemoveFromCartTrigger
│           ├── ProductAddToWishlistTrigger
│           ├── ProductRemoveFromWishlistTrigger
│           ├── ProductToggleWishlistTrigger
│           ├── ProductOrderTrigger
│           ├── ProductQuantityActions
│           ├── ProductQuantityInput
│           ├── ProductQuantityIncrementTrigger
│           └── ProductQuantityDecrementTrigger

ProductList (fetches product list)
├── Collection (data fetching)
├── CollectionView (layout)
│   └── ProductListView
│       └── Product (per item)
│           └── ProductProvider (per item)
│               └── children (user-provided sections)

ProductSearch (search with ProductSearchProvider)
└── Search (Kobalte Search primitive)
    └── itemComponent (uses SearchItemProvider + SearchItem)
        └── Product (per item)
```

## Usage Examples

### Single Product with Auto-Fetch

```tsx
<Product storeId="123" productId="456">
  <ProductImage />
  <ProductName />
  <ProductPrice />
  <ProductAddToCartTrigger />
</Product>
```

### Product List with Grid Layout

```tsx
<ProductList storeId="123">
  <ProductListView layout="vertical-grid" columns={4} gap={4}>
    <Product>
      <ProductImage />
      <ProductName />
      <ProductPrice />
      <ProductAddToCartTrigger />
    </Product>
  </ProductListView>
</ProductList>
```

### Product List with Filters

```tsx
<ProductList 
  storeId="123"
  categoryId="electronics"
  filters={{ 
    status: 'in_stock', 
    visibility: 'public',
    sortBy: 'price',
    sortOrder: 'asc'
  }}
  pageSize={12}
>
  <ProductListView>
    <Product>
      <ProductImage />
      <ProductName />
      <ProductPrice />
      <ProductStockBadge />
      <ProductAddToCartTrigger />
    </Product>
  </ProductListView>
</ProductList>
```

### Product Search (with SearchItem)

```tsx
import { Search, SearchItem, SearchInput, SearchContent, SearchListbox } from "~/components/ui/search"
import { ProductSearchProvider, Product } from "~/components/ui/product"

<ProductSearchProvider storeId="123">
  <Search
    options={searchResults()}
    onInputChange={handleSearch}
    optionValue="id"
    optionLabel="name"
    itemComponent={(itemProps) => (
      <SearchItem item={itemProps.item}>
        <Product>
          <Flex class="items-center gap-3">
            <ProductImage class="size-8 rounded object-cover" />
            <ProductName />
            <ProductPrice />
          </Flex>
        </Product>
      </SearchItem>
    )}
  >
    <SearchInput placeholder="Search products..." />
    <SearchContent>
      <SearchListbox />
    </SearchContent>
  </Search>
</ProductSearchProvider>
```

### Product with SearchItemContext (function children)

```tsx
// Using function children to access the item directly
<SearchItem>
  {(item) => (  // item is the product from search
    <Product data={item}>
      <Flex class="items-center gap-3">
        <ProductImage />
        <ProductName />
        <ProductPrice />
      </Flex>
    </Product>
  )}
</SearchItem>
```

### Custom Product Card Layout

```tsx
<Product storeId="123" productId="456">
  <Flex flexDirection="col" class="product-card">
    <ProductImage class="w-full h-48 object-cover" />
    <Flex flexDirection="col" class="p-4">
      <ProductName class="font-bold text-lg" />
      <ProductDescription class="text-sm text-gray-600" />
      <Flex flexDirection="row" class="justify-between items-center mt-2">
        <ProductPrice class="text-xl font-bold" />
        <ProductComparePrice class="text-sm text-gray-400 line-through" />
      </Flex>
      <ProductStockBadge class="mt-2" />
      <ProductQuantityActions class="mt-4" />
      <ProductAddToCartTrigger class="w-full mt-2" />
    </Flex>
  </Flex>
</Product>
```

## Props Reference

### ProductRoot (product-root.tsx)

```typescript
type ProductRootProps = {
  // Data source (priority order: data > collection > search > fetch)
  storeId?: string           // For auto-fetch (with productSlug)
  productSlug?: string        // For auto-fetch by slug (SEO-friendly)
  data?: ProductContextData | Product  // Direct data passing
   
  // Query options
  includeMedia?: boolean     // Fetch media (default: false)
  includeMetadata?: boolean  // Fetch metadata (default: false)
  queryKey?: unknown[]      // Custom query key
   
  // UI options
  errorFallback?: JSX.Element
  loadingFallback?: JSX.Element
  href?: string             // For wrapping in link
  class?: string
  children?: JSX.Element
}
```

### ProductSearchProvider (product-search.tsx)

```typescript
type ProductSearchProviderProps = {
  storeId: string            // Required for search
  debounceMs?: number        // Debounce delay (default: 300)
  minInputLength?: number    // Min chars before search (default: 1)
  placeholder?: string       // Search input placeholder
  class?: string
  children?: JSX.Element
}
```

### SearchItem (search.tsx)

```typescript
type SearchItemProps = {
  class?: string
  item?: unknown             // Optional; falls back to SearchItemContext
  children?: JSX.Element | ((item: unknown) => JSX.Element)
}
```
```

### ProductList (product-list.tsx)

```typescript
type ProductListProps = {
  // Data source
  storeId: string            // Required for auto-fetch
  
  // Filtering
  categoryId?: string        // Filter by category
  filters?: ProductFilters   // Full filter object
  searchQuery?: string       // Full-text search
  
  // Pagination
  page?: number              // Page number (default: 0)
  pageSize?: number          // Page size (default: 20)
  
  // Query options
  queryKey?: unknown[]
  enabled?: boolean
  
  // UI options
  errorFallback?: JSX.Element
  loadingFallback?: JSX.Element
  emptyFallback?: JSX.Element
  class?: string
  children?: JSX.Element
}
```

### ProductListView

```typescript
// Uses CollectionViewProps for layout
// layout: "column" | "row" | "vertical-grid" | "horizontal-grid"
// columns: 1-12
// gap: 0-12
```

### Section Components

All section components (ProductName, ProductPrice, etc.) accept:

```typescript
type ProductSectionProps = {
  class?: string            // CSS classes
  label?: string            // Override display text
  // Component-specific props...
}
```

## Context API

### ProductContextValue

```typescript
type ProductContextValue = {
  // Data
  data: ProductContextData | Product
  isLoading: boolean
  isError: boolean
  
  // Cart state
  isInCart: () => boolean
  cartQuantity: () => number
  
  // Wishlist state
  isInWishlist: () => boolean
  
  // Actions
  update: (updates: Partial<ProductDto>) => void
  
  // Inventory helpers
  getStockStatus: () => "in_stock" | "low_stock" | "out_of_stock"
  getAvailableQuantity: () => number
  isBackorderAllowed: () => boolean
}
```

### SearchItemContext (from search.tsx)

```typescript
type SearchItemContextValue = {
  item: unknown  // The raw value from Kobalte Search item
}

// Usage with useSearchItem hook
const searchItem = useSearchItem()
// searchItem.item contains the product data
```

### CollectionItemContext (from collection.tsx)

```typescript
// Used by ProductList to provide per-item data
const collectionItem = useCollectionItem()
// collectionItem.item contains the product data
```

## Inventory Status Logic

```typescript
function getStockStatus(product: ProductDto): "in_stock" | "low_stock" | "out_of_stock" {
  if (!product.trackInventory) return "in_stock"
  
  const available = product.stockQuantity - product.reservedQuantity
  
  if (available <= 0) {
    return product.allowBackorder ? "in_stock" : "out_of_stock"
  }
  
  if (available <= product.lowStockThreshold) {
    return "low_stock"
  }
  
  return "in_stock"
}
```

## Loading & Error States

### Skeleton Components

- `ProductSkeleton` - Single product skeleton
- `ProductCardSkeleton` - Product card skeleton for lists
- `ProductListSkeleton` - Full list skeleton with pagination

### Error Handling

- Network errors: Show retry button
- 404 errors: Show "Product not found"
- 403 errors: Show "Access denied"
- Validation errors: Inline field errors

## Accessibility

- All interactive elements have ARIA labels
- Keyboard navigation support
- Screen reader announcements for cart/wishlist actions
- Focus management for modals/dialogs

## Performance Considerations

- TanStack Query for caching and deduplication
- Optimistic updates for cart/wishlist
- Virtual scrolling for large product lists
- Lazy loading for product images
- Preloading on hover for product links

## Future Implementations

### Pagination Page Change Triggers Refetch
Currently, `ProductPagination` and `ProductList` share the same context, but changing page does not trigger a new fetch because the `queryKey` is static. 

**Solution:** Include `paginationCtx.page()` in the queryKey so TanStack Query treats each page as a unique query:

```typescript
const key = [
  "products", "list", 
  resolvedStoreId(),
  paginationCtx.page(),  // ← Add page to key
  local.filters
]
```

**Additional enhancements:**
- Scroll to top on page change
- Preserve scroll position when returning to previous pages
- Debounce rapid page changes

## Migration from Old Components

Old components (product.tsx, product-context.tsx) are deprecated and will be removed in v2.0.

```tsx
// OLD (deprecated)
<ProductProvider data={productData}>
  <ProductName />
  <ProductAddToCartTrigger />
</ProductProvider>

// NEW
<Product data={productData}>
  <ProductName />
  <ProductAddToCartTrigger />
</Product>
```

## Testing Strategy

1. Unit tests for inventory logic
2. Component tests for each section
3. Integration tests for ProductList with mock API
4. Visual regression tests for skeletons
5. Accessibility tests with axe-core
