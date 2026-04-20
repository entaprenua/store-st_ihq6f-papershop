# Product Detail Page Execution Plan

## Route
`/products/[slug]`

## Purpose
Display full product information with media gallery and actions.

## Components Needed

| Component | Import |
|-----------|--------|
| `Product` | `~/components/ui/product` |
| `ProductMedia` | `~/components/ui/product` |
| `MediaItemsContent` | `~/components/ui/product` |
| `ProductMediaView` | `~/components/ui/product` |
| `ProductMediaItem` | `~/components/ui/product` |
| `ProductImage` | `~/components/ui/product` |
| `ProductName` | `~/components/ui/product` |
| `ProductDescription` | `~/components/ui/product` |
| `ProductPrice` | `~/components/ui/product` |
| `ProductComparePrice` | `~/components/ui/product` |
| `ProductStockBadge` | `~/components/ui/product` |
| `ProductAddToCartTrigger` | `~/components/ui/product` |
| `ProductToggleWishlistTrigger` | `~/components/ui/product` |
| `ProductQuantityActions` | `~/components/ui/product` |
| `Grid` | `~/components/ui/grid` |
| `Carousel` | `~/components/ui/carousel` |
| `CarouselContent` | `~/components/ui/carousel` |
| `CarouselItem` | `~/components/ui/carousel` |
| `CarouselNext` | `~/components/ui/carousel` |
| `CarouselPrevious` | `~/components/ui/carousel` |

## Structure

```tsx
import { useParams } from "@solidjs/router"

export default function ProductDetailPage() {
  const params = useParams()
  
  return (
    <div class="min-h-screen flex flex-col">
      <Header />
      <main class="flex-1">
        <Product slug={params.slug} includeMedia>
          <div class="container mx-auto px-4 py-8">
            <Grid cols={1} colsMd={2} gap={8}>
              {/* Left: Media Gallery */}
              <div>
                <ProductMedia>
                  <Carousel>
                    <CarouselContent>
                      <MediaItemsContent>
                        <CarouselItem class="w-full">
                          <ProductMediaView>
                            <ProductMediaItem class="w-full aspect-square object-cover rounded-lg" />
                          </ProductMediaView>
                        </CarouselItem>
                      </MediaItemsContent>
                    </CarouselContent>
                    <CarouselNext />
                    <CarouselPrevious />
                  </Carousel>
                </ProductMedia>
              </div>
              
              {/* Right: Product Info */}
              <div class="space-y-6">
                <ProductName class="text-3xl font-bold" />
                <div class="flex items-baseline gap-3">
                  <ProductPrice class="text-2xl font-bold text-primary" />
                  <ProductComparePrice class="text-lg text-muted-foreground line-through" />
                </div>
                <ProductStockBadge />
                <ProductDescription class="text-muted-foreground" />
                
                <ProductQuantityActions />
                
                <div class="flex gap-4">
                  <ProductAddToCartTrigger class="flex-1" />
                  <ProductToggleWishlistTrigger />
                </div>
              </div>
            </Grid>
          </div>
        </Product>
      </main>
      <Footer />
    </div>
  )
}
```

## Steps

1. Create `src/routes/products/[slug].tsx`
2. Import `useParams` from `@solidjs/router`
3. Wrap content in `<Product slug={params.slug} includeMedia>`
4. Create two-column grid (media gallery + product info)
5. Add ProductMedia with Carousel for image gallery
6. Add product details (name, price, description, stock)
7. Add action buttons (add to cart, wishlist)
8. Run zclint to verify

## Notes

- `includeMedia` prop fetches product media from API
- ProductMedia uses Collection internally
- MediaItemsContent shows content only when media exists
- Use Carousel for multi-image/video gallery

## File Location
`templates/electronics/src/routes/products/[slug].tsx`
