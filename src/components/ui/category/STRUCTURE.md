# Category Components Architecture

## Overview

Atomic, composable category components following the codeless pattern used by Product and Hero components. Users compose UI by nesting components without manual data passing.

## Design Principles

1. **Codeless** - Components auto-read from context, no manual data passing
2. **Composable** - Section primitives that users combine freely
3. **Auto-Nesting** - Nested `CategoryItems` automatically infers parent from context
4. **Atomic** - Raw value components, user provides styling
5. **Layout Flexible** - Layout is controlled by user via Grid, Flex, etc.

## Core Pattern

```tsx
<CategoryItems storeId="123">
  <Grid cols={4}>
    <CategoryItemsView>
      {(item) => (
        <Category>
          <CategoryName />
          <CategoryImage />
          
          <CategoryItems>
            <CategoryItemsView>
              {(item) => (
                <Category>
                  <CategoryName />
                </Category>
              )}
            </CategoryItemsView>
          </CategoryItems>
        </Category>
      )}
    </CategoryItemsView>
  </Grid>
</CategoryItems>
```

### How Auto-Nesting Works

1. `CategoryItems` at top level fetches root categories (no parentId)
2. Each iteration provides `CollectionItemContext` with current category
3. Nested `CategoryItems` inside a category iteration auto-detects parent via `useCollectionItem()`
4. Nested `CategoryItems` fetches children of that parent category
5. Pattern repeats recursively

## Components

### CategoryItems

Fetches categories with automatic nesting support.

```typescript
type CategoryItemsProps = {
  storeId?: string
  parentId?: string           // Explicit parent (optional)
  page?: number
  pageSize?: number
  queryKey?: unknown[]
  enabled?: boolean
  errorFallback?: JSX.Element
  loadingFallback?: JSX.Element
  children?: JSX.Element
}
```

### CategoryItemsView

Renders list layout.

```typescript
type CategoryItemsViewProps = {
  class?: string
  children?: JSX.Element | ((item: Category, index: number) => JSX.Element)
}
```

### Category

Wraps content, auto-reads from `CollectionItemContext`.

```typescript
type CategoryProps = {
  storeId?: string
  categorySlug?: string       // By slug lookup
  data?: CategoryProps       // Explicit data (optional)
  class?: string
  children?: JSX.Element
}
```

### CategoryContext

Provides access to category data for section components.

```typescript
type CategoryContextValue = {
  data: Accessor<CategoryProps | null>
  id: Accessor<string | null>
  name: Accessor<string | null>
  slug: Accessor<string | null>
  image: Accessor<string | null>
  level: Accessor<number | null>
  parentId: Accessor<string | null>
  path: Accessor<string | null>        // LTree path string
  depth: Accessor<number | null>        // Extracted from path
  isRoot: Accessor<boolean>
}

export const useCategory = (): CategoryContextValue => { ... }
```

## Atomic Section Primitives

All components read from `useCategory()`. User composes styling.

```typescript
<CategoryName class?: string />
<CategoryImage class?: string; alt?: string />
<CategorySlug class?: string />
<CategoryLevel class?: string />
<CategoryDepth class?: string />
<CategoryPath class?: string />
<CategoryParentId class?: string />
```

## Usage Examples

### Simple Grid

```tsx
<CategoryItems storeId="123">
  <Grid cols={4} gap={4}>
    <CategoryItemsView>
      {(item) => (
        <Category class="p-4 border rounded-lg">
          <CategoryImage class="w-full h-32 object-cover rounded" />
          <CategoryName class="font-semibold mt-2" />
        </Category>
      )}
    </CategoryItemsView>
  </Grid>
</CategoryItems>
```

### Codeless Tree

```tsx
<CategoryItems storeId="123">
  <Grid cols={2} gap={4}>
    <CategoryItemsView>
      {(item) => (
        <Category class="p-4 border rounded-lg">
          <CategoryName class="font-medium" />
          
          <CategoryItems>
            <CategoryItemsView>
              {(item) => (
                <Category class="ml-4 py-1">
                  <CategoryName />
                </Category>
              )}
            </CategoryItemsView>
          </CategoryItems>
        </Category>
      )}
    </CategoryItemsView>
  </Grid>
</CategoryItems>
```

### With Function Children

```tsx
<CategoryItems storeId="123">
  <Flex gap={4}>
    <CategoryItemsView>
      {(item, index) => (
        <div class="flex items-center gap-2">
          <span>{index + 1}.</span>
          <CategoryName />
        </div>
      )}
    </CategoryItemsView>
  </Flex>
</CategoryItems>
```

## File Structure

```
src/components/ui/category/
├── index.ts                    # Barrel exports
├── category-context.tsx        # Context + useCategory() hook
├── category-root.tsx           # Category component
├── category-list.tsx          # CategoryItems + CategoryItemsView
├── category-sections.tsx       # Atomic primitives
└── STRUCTURE.md               # This file
```

## API Alignment

| Endpoint | CategoryItems Usage |
|----------|-------------------|
| `GET /stores/:id/categories?root=true` | Root categories (no parentId) |
| `GET /stores/:id/categories/:parentId/subcategories` | Children of parent (with parentId) |
| `GET /stores/:id/categories/by-slug/:slug` | Single category by slug |

## Migration Notes

### Old → New

```tsx
// OLD
<Category storeId="123" categoryId="456">
  <CategoryImage />
  <CategoryName />
</Category>

// NEW
<CategoryItems storeId="123">
  <Grid cols={4}>
    <CategoryItemsView>
      {(item) => (
        <Category>
          <CategoryImage />
          <CategoryName />
        </Category>
      )}
    </CategoryItemsView>
  </Grid>
</CategoryItems>
```
