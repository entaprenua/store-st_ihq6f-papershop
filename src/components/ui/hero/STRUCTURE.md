# Hero Components Architecture

## Overview

This directory contains zero-code ready hero/banner components for the visual builder. Components are designed to be fully composable - users can include/exclude sections by simply adding/removing child components.

## Design Principles

1. **Zero-Code Ready** - All components work without manual setup; just drop them in and configure via props
2. **Composable** - Sections are separate components that can be included/excluded via children
3. **Auto-Fetching** - Components fetch their own data when given storeId/heroId
4. **Auto-Detection** - Sections automatically detect the correct hero item based on context (carousel, collection, or active item)
5. **Context-Based** - Uses `CollectionItemContext` from Collection for unified item iteration
6. **Layout Flexible** - Layout is controlled by user via Grid, Flex, Carousel, etc.

## Directory Structure

```
components/ui/hero/
├── STRUCTURE.md              # This file
├── index.ts                  # Barrel exports
├── hero-context.tsx          # React context for hero state + useHero hook
├── hero-root.tsx             # HeroRoot, HeroItems, HeroItemsView, HeroItem components
├── hero-sections.tsx         # All hero section components + useHeroItem hook
└── hero-skeleton.tsx         # Loading skeleton components
```

## Components

| Component | Description |
|-----------|-------------|
| `HeroRoot` | Fetches hero data and provides context |
| `HeroItems` | Collection wrapper - provides item context |
| `HeroItemsView` | CollectionView wrapper - renders items |
| `HeroItem` | Single hero item display |
| `HeroSkeleton` | Loading skeleton |

## Usage Pattern

```tsx
// With Grid layout
<HeroRoot storeId="123">
  <HeroItems>
    <Grid cols={2} gap={4}>
      <HeroItemsView>
        {(item) => <HeroItem item={item} />}
      </HeroItemsView>
    </Grid>
  </HeroItems>
</HeroRoot>

// With Carousel
<HeroRoot storeId="123">
  <Carousel>
    <HeroItems>
      <CarouselContent>
        <HeroItemsView>
          <CarouselItem>
            <HeroItem />
          </CarouselItem>
        </HeroItemsView>
      </CarouselContent>
    </HeroItems>
  </Carousel>
</HeroRoot>

// Single item (auto-detect)
<HeroRoot storeId="123">
  <HeroItem>
    <HeroContent contentPosition="center">
      <HeroTitle />
      <HeroCtaPrimary />
    </HeroContent>
  </HeroItem>
</HeroRoot>
```

## useHeroItem Hook

The `useHeroItem` hook provides automatic item detection for hero sections. It checks contexts in the following priority order:

```typescript
const useHeroItem = () => {
  const hero = useHero()
  const collectionItem = useCollectionItem()  // From CollectionItemContext
  const carousel = useCarousel()

  return createMemo(() => {
    // 1. CollectionItem context (HeroItems iteration via Collection)
    if (collectionItem?.item) {
      return collectionItem.item as HeroItem
    }
    // 2. Carousel context (fallback)
    if (carousel) {
      return hero?.items()[carousel.selectedIndex()] ?? hero?.activeItem() ?? null
    }
    // 3. Default to active item
    return hero?.activeItem() ?? null
  })
}
```

### Context Priority

| Priority | Context Source | When Used |
|---------|---------------|-----------|
| 1 | `CollectionItem` (from Collection) | Inside `HeroItemsView` |
| 2 | Carousel selected index | Inside CarouselItem |
| 3 | `activeItem` | Default fallback |

## Component Hierarchy

### HeroItems Layout (Grid)
```
HeroRoot (fetches hero by ID or store)
└── HeroProvider (context)
    └── HeroItems (Collection)
        └── Grid/Flex/Carousel (user's layout choice)
            └── HeroItemsView (CollectionView)
                └── HeroItem
                    ├── HeroBackground     ← useHeroItem() → CollectionItem
                    ├── HeroContent
                    │   ├── HeroTitle
                    │   ├── HeroSubtitle
                    │   ├── HeroDescription
                    │   ├── HeroCtaPrimary
                    │   └── HeroCtaSecondary
```

### Single Hero (Auto-Detect)
```
HeroRoot
└── HeroProvider
    └── HeroItem (uses activeItem)
        ├── HeroBackground     ← useHeroItem() → activeItem
        ├── HeroContent
        │   ├── HeroTitle
        │   └── ...
```

## Props Reference

### HeroRoot (hero-root.tsx)

```typescript
type HeroRootProps = {
  // Data source
  heroId?: string           // Fetch by ID
  storeId?: string          // Fetch active hero for store
  data?: Hero               // Direct data passing
  
  // Query options
  queryKey?: unknown[]
  enabled?: boolean
  
  // UI options
  class?: string
  children?: JSX.Element
  errorFallback?: JSX.Element
  loadingFallback?: JSX.Element
}
```

### HeroItems (hero-root.tsx)

```typescript
type HeroItemsProps = {
  class?: string
  children?: JSX.Element
}
```

### HeroItemsView (hero-root.tsx)

```typescript
type HeroItemsViewProps = {
  class?: string
  children?: JSX.Element | ((item: HeroItemType, index: number) => JSX.Element)
}
```

### HeroItem (hero-root.tsx)

```typescript
type HeroItemProps = {
  item?: HeroItemType        // Explicit item (optional)
  aspectRatio?: string
  maxHeight?: number
  class?: string
  children?: JSX.Element
}
```

## Section Components (hero-sections.tsx)

All section components accept:

```typescript
type HeroSectionProps = {
  class?: string             // CSS classes
  label?: string             // Override display text
  children?: JSX.Element     // Override content
}
```

### Available Sections

| Component | Displays |
|-----------|----------|
| `HeroBackground` | Background image/color/gradient with overlay |
| `HeroContent` | Container with positioning |
| `HeroTitle` | Title text with color |
| `HeroSubtitle` | Subtitle text with color |
| `HeroDescription` | Description text with color |
| `HeroCtaPrimary` | Primary CTA button |
| `HeroCtaSecondary` | Secondary CTA button |

## Database Schema Alignment

### heroes table

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `store_id` | UUID | FK to stores |
| `name` | VARCHAR(100) | Hero section name |
| `display_type` | VARCHAR(30) | carousel, grid, stack, fade, slide |
| `autoplay` | BOOLEAN | Auto-advance slides |
| `autoplay_interval` | INT | Milliseconds between slides |
| `show_indicators` | BOOLEAN | Show dots/pagination |
| `show_navigation` | BOOLEAN | Show prev/next arrows |
| `aspect_ratio` | VARCHAR(20) | CSS aspect-ratio |
| `max_height` | INT | Max height in pixels |
| `gap` | INT | Gap between items |
| `is_active` | BOOLEAN | Active status |
| `starts_at` | TIMESTAMPTZ | Schedule start |
| `ends_at` | TIMESTAMPTZ | Schedule end |
| `metadata` | JSONB | Custom metadata |

### hero_items table

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `hero_id` | UUID | FK to heroes |
| `sort_order` | INT | Display order |
| `background_type` | VARCHAR(20) | image, video, color, gradient |
| `background_image_url` | TEXT | Image URL |
| `background_image_alt` | TEXT | Alt text |
| `background_video_url` | TEXT | Video URL |
| `background_color` | VARCHAR(20) | Solid color |
| `background_gradient` | TEXT | CSS gradient |
| `overlay_color` | VARCHAR(20) | Overlay color |
| `overlay_opacity` | DECIMAL(3,2) | 0.00-0.99 |
| `title` | TEXT | Main title |
| `title_color` | VARCHAR(20) | Title text color |
| `subtitle` | TEXT | Subtitle text |
| `subtitle_color` | VARCHAR(20) | Subtitle color |
| `description` | TEXT | Description text |
| `description_color` | VARCHAR(20) | Description color |
| `content_position` | VARCHAR(20) | Flex alignment |
| `text_alignment` | VARCHAR(10) | Text align |
| `cta_text` | VARCHAR(100) | Primary CTA text |
| `cta_url` | TEXT | Primary CTA URL |
| `cta_style` | VARCHAR(30) | primary, outline, ghost |
| `cta_target` | VARCHAR(10) | _self, _blank |
| `cta_secondary_text` | VARCHAR(100) | Secondary CTA text |
| `cta_secondary_url` | TEXT | Secondary CTA URL |
| `cta_secondary_style` | VARCHAR(30) | Secondary CTA style |
| `cta_secondary_target` | VARCHAR(10) | Secondary CTA target |
| `mobile_background_image_url` | TEXT | Mobile image |
| `mobile_content_position` | VARCHAR(20) | Mobile position |
| `hide_on_mobile` | BOOLEAN | Hide on mobile |
| `hide_on_desktop` | BOOLEAN | Hide on desktop |
| `starts_at` | TIMESTAMPTZ | Schedule start |
| `ends_at` | TIMESTAMPTZ | Schedule end |
| `is_active` | BOOLEAN | Active status |
| `metadata` | JSONB | Custom metadata |

## Server API Alignment

### Endpoints (from heroesApi)

| Endpoint | Usage |
|----------|-------|
| `GET /stores/:storeId/heroes` | List all heroes for store |
| `GET /stores/:storeId/heroes/active` | Get active heroes |
| `GET /heroes/:id` | Get hero by ID |
| `POST /stores/:storeId/heroes` | Create hero |
| `PUT /heroes/:id` | Update hero |
| `DELETE /heroes/:id` | Delete hero |

## Loading & Error States

### Skeleton Components

- `HeroSkeleton` - Single hero skeleton

### Empty Handling

Hero components automatically hide when there are no items to display. This is handled at the `HeroRoot` level:

```tsx
// HeroRootContent checks for items before rendering
<Show when={props.data?.items && props.data.items.length > 0} fallback={null}>
  <HeroProvider initialHero={props.data}>
    {/* children */}
  </HeroProvider>
</Show>
```

This means:
- No loading state shown when hero has no items
- No empty state message displayed
- Section is completely hidden if empty

### Error Handling

- Network errors: Show retry button
- 404 errors: Show "Hero not found"

## Accessibility

- ARIA labels for navigation buttons
- Keyboard navigation (arrow keys for carousel)
- Screen reader announcements for slide changes
- Focus management for interactive elements

## Performance Considerations

- TanStack Query for caching
- Lazy loading for background images
- Intersection Observer for viewport-based loading
- Debounced autoplay

## Migration from Old Components

Old components (hero.tsx, hero-context.tsx at root UI level) are deprecated.

```tsx
// OLD (deprecated)
<HeroProvider initialHero={heroData}>
  <Hero>
    <HeroItems />
  </Hero>
</HeroProvider>

// NEW
<HeroRoot data={heroData}>
  <HeroItem>
    <HeroBackground />
    <HeroContent />
  </HeroItem>
</HeroRoot>
```
