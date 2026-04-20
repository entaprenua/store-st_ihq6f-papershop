# Wishlist Page Execution Plan

## Route
`/wishlist`

## Purpose
Display user's saved products with ability to add to cart or remove.

## Components Needed

| Component | Import |
|-----------|--------|
| `WishlistRoot` | `~/components/ui/wishlist` |
| `WishlistItems` | `~/components/ui/wishlist` |
| `WishlistItemsView` | `~/components/ui/wishlist` |
| `WishlistItemsEmpty` | `~/components/ui/wishlist` |
| `Grid` | `~/components/ui/grid` |
| `Product` | `~/components/ui/product` |
| `ProductImage` | `~/components/ui/product` |
| `ProductName` | `~/components/ui/product` |
| `ProductPrice` | `~/components/ui/product` |
| `ProductAddToCartTrigger` | `~/components/ui/product` |
| `ProductRemoveFromWishlistTrigger` | `~/components/ui/product` |
| `Button` | `~/components/ui/button` |

## Structure

```tsx
export default function WishlistPage() {
  return (
    <div class="min-h-screen flex flex-col">
      <Header />
      <main class="flex-1">
        <div class="container mx-auto px-4 py-8">
          <h1 class="text-3xl font-bold mb-8">My Wishlist</h1>
          
          <WishlistRoot>
            <WishlistItems>
              <Grid cols={2} colsSm={2} colsMd={3} colsLg={4} gap={6}>
                <WishlistItemsView>
                  <Product class="group bg-white rounded-lg border m-1">
                    <div class="relative overflow-hidden rounded-lg">
                      <ProductImage class="w-full aspect-square object-cover transition-transform group-hover:scale-105" />
                      <ProductRemoveFromWishlistTrigger class="absolute top-2 right-2" />
                    </div>
                    <div class="p-4">
                      <ProductName class="font-medium line-clamp-2" />
                      <ProductPrice class="font-bold mt-2" />
                      <ProductAddToCartTrigger class="w-full mt-4" />
                    </div>
                  </Product>
                </WishlistItemsView>
              </Grid>
              <WishlistItemsEmpty>
                <div class="text-center py-12">
                  <h2 class="text-xl font-medium mb-2">No wishlist items yet</h2>
                  <p class="text-muted-foreground mb-4">Add products to your wishlist to save them for later</p>
                  <Button href="/products">Browse Products</Button>
                </div>
              </WishlistItemsEmpty>
            </WishlistItems>
          </WishlistRoot>
        </div>
      </main>
      <Footer />
    </div>
  )
}
```

## Steps

1. Create `src/routes/wishlist.tsx` (or `src/routes/wishlist/index.tsx`)
2. Import all necessary wishlist and product components
3. Wrap content in `WishlistRoot`
4. Add `WishlistItems` with Grid layout
5. Add `WishlistItemsView` for product rendering
6. Add `WishlistItemsEmpty` for empty state
7. Include remove and add-to-cart actions
8. Run zclint to verify

## Notes

- `WishlistItemsEmpty` is inside `WishlistItems` to get Collection context
- Uses `CollectionEmpty` internally via `WishlistItemsEmpty`
- `ProductRemoveFromWishlistTrigger` removes item from wishlist
- `ProductAddToCartTrigger` moves item to cart

## File Location
`templates/electronics/src/routes/wishlist.tsx`
