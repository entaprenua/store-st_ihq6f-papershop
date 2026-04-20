# Search Page Execution Plan

## Route
`/search`

## Purpose
Display search results for user queries.

## Components Needed

| Component | Import |
|-----------|--------|
| `ProductSearch` | `~/components/ui/product` |
| `ProductSearchProvider` | `~/components/ui/product` |
| `SearchInput` | `~/components/ui/search` |
| `SearchContent` | `~/components/ui/search` |
| `SearchItem` | `~/components/ui/search` |
| `ProductList` | `~/components/ui/product` |
| `ProductListView` | `~/components/ui/product` |
| `ProductListContent` | `~/components/ui/product` |
| `Grid` | `~/components/ui/grid` |
| `Product` | `~/components/ui/product` |
| `ProductImage` | `~/components/ui/product` |
| `ProductName` | `~/components/ui/product` |
| `ProductPrice` | `~/components/ui/product` |

## Structure

```tsx
import { useSearchParams } from "@solidjs/router"

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  
  return (
    <div class="min-h-screen flex flex-col">
      <Header />
      <main class="flex-1">
        <div class="container mx-auto px-4 py-8">
          <h1 class="text-3xl font-bold mb-8">Search Products</h1>
          
          {/* Search Input */}
          <ProductSearchProvider>
            <div class="max-w-xl mb-8">
              <SearchInput
                placeholder="Search for products..."
                value={searchParams.q || ""}
                onInput={(e) => setSearchParams({ q: e.currentTarget.value })}
              />
            </div>
            
            {/* Search Results */}
            {searchParams.q && (
              <ProductList filters={{ q: searchParams.q }}>
                <ProductListContent>
                  <p class="text-muted-foreground mb-4">
                    Showing results for "{searchParams.q}"
                  </p>
                  <Grid cols={2} colsSm={2} colsMd={3} colsLg={4} gap={6}>
                    <ProductListView>
                      <Product href="/products/[slug]" class="group bg-white rounded-lg border m-1">
                        <div class="relative overflow-hidden rounded-lg">
                          <ProductImage class="w-full aspect-square object-cover transition-transform group-hover:scale-105" />
                        </div>
                        <div class="p-4">
                          <ProductName class="font-medium line-clamp-2" />
                          <ProductPrice class="font-bold mt-2" />
                        </div>
                      </Product>
                    </ProductListView>
                  </Grid>
                </ProductListContent>
              </ProductList>
            )}
          </ProductSearchProvider>
        </div>
      </main>
      <Footer />
    </div>
  )
}
```

## Steps

1. Create `src/routes/search.tsx`
2. Import `useSearchParams` from `@solidjs/router`
3. Add search input with URL synchronization
4. Add `ProductSearchProvider` for search functionality
5. Use `ProductList` with `filters={{ q: searchParams.q }}`
6. Display results in responsive Grid
7. Run zclint to verify

## Notes

- Search query synced with URL params (`?q=...`)
- `ProductList` accepts `filters` prop for API filtering
- Results show query term in header
- Link products to detail page

## File Location
`templates/electronics/src/routes/search.tsx`
