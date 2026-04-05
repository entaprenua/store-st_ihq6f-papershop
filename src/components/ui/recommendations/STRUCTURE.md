# Recommendations Components Architecture

## Overview

This directory contains zero-code ready product recommendations components for the visual builder. Components are designed to be fully composable - users can include/exclude sections by simply adding/removing child components. They integrate with existing `Product` components for displaying individual products.

## Design Principles

1. **Zero-Code Ready** - Components work without manual setup; just drop them in and configure via props
2. **Composable** - Sections are separate components that can be included/excluded via children
3. **Auto-Fetching** - Components fetch their own data using storeId from context
4. **Auto-Detection** - Components auto-detect storeId from `useStoreId()` context
5. **Context-Based** - Uses `CollectionItemContext` from Collection for unified item iteration
6. **Layout Flexible** - Layout is controlled by user via Grid, Flex, Carousel, etc.

## Directory Structure

```
src/components/ui/recommendations/
├── STRUCTURE.md                       # This file
├── index.ts                           # Barrel exports
├── recommendations-context.tsx         # Context + useRecommendations hook
├── recommendations-root.tsx            # RecommendationsRoot, RecommendationsItems, RecommendationsItemsView
├── recommendations-sections.tsx         # UI sections (title)
├── recommendations-skeleton.tsx        # Loading states
└── recommendations-carousel.tsx        # REMOVED - use Carousel components instead
```

## Components

| Component | Description |
|-----------|-------------|
| `RecommendationsRoot` | Fetches recommendations data and provides context |
| `RecommendationsItems` | Collection wrapper - provides item context |
| `RecommendationsItemsView` | CollectionView wrapper - renders items |
| `RecommendationsTitle` | Section title |
| `RecommendationsSkeleton` | Loading skeleton |
| `useRecommendations` | Hook to access recommendations context |

## Recommendation Types

| Type | Description | Requires Auth |
|------|-------------|---------------|
| `personalized` | Based on user's view/purchase history | No (falls back to popular) |
| `popular` | Most ordered products in last 30 days | No |
| `related` | Products from same categories | No |
| `bought_together` | Frequently ordered together | No |
| `newest` | Most recently added products | No |

## Usage Pattern

```tsx
// With Grid layout
<RecommendationsRoot type="newest" limit={12}>
  <RecommendationsTitle class="text-2xl font-bold mb-4" />
  <RecommendationsItems>
    <Grid cols={4} gap={4}>
      <RecommendationsItemsView>
        {(item) => (
          <Product item={item}>
            <ProductImage class="rounded-lg aspect-square object-cover" />
            <ProductName />
            <ProductPrice />
          </Product>
        )}
      </RecommendationsItemsView>
    </Grid>
  </RecommendationsItems>
</RecommendationsRoot>

// With Carousel
<RecommendationsRoot type="personalized" limit={10}>
  <Carousel>
    <RecommendationsItems>
      <CarouselContent>
        <RecommendationsItemsView>
          <CarouselItem class="basis-1/2 md:basis-1/3 lg:basis-1/4">
            <Product>
              <ProductImage />
              <ProductName />
              <ProductPrice />
            </Product>
          </CarouselItem>
        </RecommendationsItemsView>
      </CarouselContent>
    </RecommendationsItems>
  </Carousel>
</RecommendationsRoot>
```

## useRecommendations Hook

The `useRecommendations` hook provides access to recommendations state and methods:

```typescript
const useRecommendations = () => {
  // Returns RecommendationContextValue
}
```

### RecommendationContextValue

```typescript
type RecommendationContextValue = {
  // Data
  recommendations: Accessor<{
    products: Product[]
    source: RecommendationSource | null
    fallback: RecommendationSource | null
  } | null>
  products: Accessor<Product[]>
  source: Accessor<RecommendationSource | null>
  fallback: Accessor<RecommendationSource | null>
  currentIndex: Accessor<number>
  
  // Actions
  setProducts: (products: Product[]) => void
  setSource: (source: RecommendationSource | null) => void
  setFallback: (fallback: RecommendationSource | null) => void
  setCurrentIndex: (index: number) => void
  next: () => void
  prev: () => void
  goTo: (index: number) => void
  clear: () => void
}
```

## Component Hierarchy

### With Grid Layout
```
RecommendationsRoot (fetches recommendations)
└── RecommendationsProvider (context)
    └── RecommendationsItems (Collection)
        └── Grid/Flex/Carousel (user's layout choice)
            └── RecommendationsItemsView (CollectionView)
                └── Product
                    ├── ProductImage
                    ├── ProductName
                    └── ProductPrice
```

### With Carousel
```
RecommendationsRoot
└── RecommendationsProvider
    └── Carousel
        └── RecommendationsItems (Collection)
            └── CarouselContent
                └── RecommendationsItemsView (CollectionView)
                    └── CarouselItem
                        └── Product
                            ├── ProductImage
                            ├── ProductName
                            └── ProductPrice
```

## Props Reference

### RecommendationsRoot (recommendations-root.tsx)

```typescript
type RecommendationsRootProps = {
  // Data source
  type?: RecommendationType           // Default: "personalized"
  limit?: number                       // Default: 10
  data?: RecommendationResponse        // Direct data (optional)
  
  // Query options
  queryKey?: unknown[]
  enabled?: boolean                   // Default: true
  
  // UI
  class?: string
  children?: JSX.Element
  errorFallback?: JSX.Element
  loadingFallback?: JSX.Element
}
```

**Note:** `storeId` is automatically inferred from `useStoreId()` context.

### RecommendationsTitle (recommendations-sections.tsx)

```typescript
type RecommendationsTitleProps = {
  class?: string
  level?: "h1" | "h2" | "h3" | "h4"  // Heading level, default: "h2"
  children?: JSX.Element
}
```

### RecommendationsItems (recommendations-root.tsx)

```typescript
type RecommendationsItemsProps = {
  class?: string
  children?: JSX.Element
}
```

### RecommendationsItemsView (recommendations-root.tsx)

```typescript
type RecommendationsItemsViewProps = {
  class?: string
  children?: JSX.Element | ((item: Product, index: number) => JSX.Element)
}
```

## API Functions

### recommendationsApi (lib/api/recommendations.ts)

```typescript
export const recommendationsApi = {
  // Get recommendations
  get: async (
    storeId: string,
    type: RecommendationType = "personalized",
    limit: number = 10,
    sessionId?: string
  ): Promise<RecommendationResponse>
  
  // Track product view
  trackView: async (
    storeId: string,
    productId: string,
    sessionId?: string
  ): Promise<{ tracked: boolean }>
  
  // Add to favorites
  addFavorite: async (
    storeId: string,
    productId: string,
    userId: string
  ): Promise<{ added: boolean }>
  
  // Remove from favorites
  removeFavorite: async (
    storeId: string,
    productId: string,
    userId: string
  ): Promise<{ removed: boolean }>
}
```

## Database Schema Alignment

### product_views (tracking)

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `product_id` | UUID | FK to products |
| `user_id` | UUID | FK to users (nullable for guests) |
| `session_id` | VARCHAR(100) | Session identifier |
| `referrer` | VARCHAR(500) | Referrer URL |
| `user_agent` | VARCHAR(500) | Browser user agent |
| `viewed_at` | TIMESTAMPTZ | View timestamp |

### product_favorites (wishlist)

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `product_id` | UUID | FK to products |
| `user_id` | UUID | FK to users |
| `created_at` | TIMESTAMPTZ | When added to favorites |

## Server API Alignment

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/stores/{storeId}/recommendations` | Get product recommendations |
| POST | `/api/v1/stores/{storeId}/products/{id}/view` | Track product view |
| POST | `/api/v1/stores/{storeId}/products/{id}/favorite` | Add to favorites |
| DELETE | `/api/v1/stores/{storeId}/products/{id}/favorite` | Remove from favorites |

### Get Recommendations

```
GET /api/v1/stores/{storeId}/recommendations?type={type}&limit={limit}
```

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| type | string | "personalized" | `personalized`, `popular`, `related`, `bought_together`, `newest` |
| limit | int | 10 | Number of products |

**Headers:**
- `X-Session-Id` - Optional session ID for personalized recommendations

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [...],
    "source": "personalized",
    "fallback": "popular"
  }
}
```

## Empty Handling

Recommendations automatically hide when there are no products to display:

```tsx
// In RecommendationsRoot
<Show when={local.data!.products.length > 0} fallback={null}>
  <RecommendationsProvider initialData={local.data!}>
    {/* children */}
  </RecommendationsProvider>
</Show>
```

This means:
- No empty state message displayed to users
- Section is completely hidden if no recommendations
- Consistent with industry standard (Amazon, Netflix, etc.)

## Loading & Error States

### Skeleton Components

- `RecommendationsSkeleton` - Main skeleton with 4 item placeholders

### Error Handling

- Network errors: Propagated to errorFallback
- 404 errors: Show empty (hidden)
- Failed to load: Error boundary

## Accessibility

- ARIA labels for navigation buttons
- Keyboard navigation (arrow keys for carousel)
- Screen reader announcements for loading states
- Focus management for interactive elements

## Performance Considerations

- TanStack Query for caching
- Lazy loading for product images
- Intersection Observer for viewport-based loading
- Debounced autoplay
