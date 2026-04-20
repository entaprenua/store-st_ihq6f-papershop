import { Product, ProductMedia, ProductMediaView, ProductMediaItem, ProductMediaItemsContent } from "~/components/ui/product"
import { ProductName, ProductImage, ProductPrice, ProductComparePrice, ProductStockBadge, ProductDescription, ProductQuantityActions, ProductAddToCartTrigger, ProductToggleWishlistTrigger } from "~/components/ui/product"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel"
import { Grid } from "~/components/ui/grid"
import { Flex } from "~/components/ui/flex"
import { Text } from "~/components/ui/text"
export default function ProductDetailPage() {

  const Media = () => {
    return (
      <ProductMedia>
        <ProductMediaItemsContent>
          <section class="text-xl text-bold"> Product Media </section>
          <Flex class=" border border-2 overflow-auto">
            <ProductMediaView>
              <ProductMediaItem class="w-full h-50 m-2 bg-red-100 aspect-square object-cover rounded-lg" />
            </ProductMediaView>
          </Flex>
        </ProductMediaItemsContent>
      </ProductMedia>
    )
  }

  return (
    <Product includeMedia>
      <Flex class="container mx-auto px-4 py-8 justify-start">
        <Grid cols={1} colsMd={2} gap={8}>
          <ProductImage class="max-h-80 max-w-80 rounded-sm" />
          <div class="space-y-6 m-2">
            <ProductName class="text-3xl font-bold" />
            <div class="flex items-baseline gap-3">
              <ProductPrice class="text-2xl font-bold text-primary" />
              <ProductComparePrice class="text-lg text-muted-foreground line-through" />
            </div>
            <ProductStockBadge />
            <ProductDescription class="text-muted-foreground" />

            <ProductQuantityActions />

            <Flex class="gap-4">
              <ProductAddToCartTrigger class="flex-1" />
              <ProductToggleWishlistTrigger />
            </Flex>
          </div>
        </Grid>
      </Flex >
      <Media />
    </Product >
  )
}
