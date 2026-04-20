import { WishlistRoot, WishlistItems, WishlistItemsView, WishlistItemsEmpty } from "~/components/ui/wishlist"
import { Product, ProductImage, ProductName, ProductPrice, ProductAddToCartTrigger, ProductRemoveFromWishlistTrigger } from "~/components/ui/product"
import { Button } from "~/components/ui/button"
import { Grid } from "~/components/ui/grid"
import { Text } from "~/components/ui/text"

export default function WishlistPage() {
  return (
    <WishlistRoot>
      <div class="container mx-auto px-4 py-8">
        <Text variant="h1" class="text-3xl font-bold mb-8">My Wishlist</Text>
        
        <WishlistItems>
          <Grid cols={2} colsSm={2} colsMd={3} colsLg={4} gap={6}>
            <WishlistItemsView>
              <Product class="group bg-white rounded-lg border m-1">
                <div class="relative overflow-hidden rounded-lg">
                  <ProductImage class="w-full aspect-square object-cover transition-transform group-hover:scale-105" />
                  <div class="absolute top-2 right-2">
                    <ProductRemoveFromWishlistTrigger class="p-2 bg-white/90 rounded-full hover:bg-white" />
                  </div>
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
      </div>
    </WishlistRoot>
  )
}
