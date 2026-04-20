import { HeroRoot, HeroItems, HeroItemsView, HeroItem, HeroBackground, HeroContent, HeroTitle, HeroSubtitle, HeroDescription, HeroCtaPrimary } from "~/components/ui/hero"
import { CategoryList, CategoryListEmptyView, CategoryListView, Category, CategoryImage, CategoryName } from "~/components/ui/category"
import { RecommendationsRoot, RecommendationsItems, RecommendationsItemsView, RecommendationsContent } from "~/components/ui/recommendations"
import { Product, ProductImage, ProductName, ProductPrice, ProductStockBadge, ProductAddToCartTrigger, ProductToggleWishlistTrigger } from "~/components/ui/product"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel"
import { Grid } from "~/components/ui/grid"
import { Flex } from "~/components/ui/flex"
import { Text } from "~/components/ui/text"

function HeroSection() {
  return (
    <HeroRoot class="w-full">
      <Carousel autoplay>
        <CarouselContent>
          <HeroItems>
            <HeroItemsView>
              <CarouselItem class="w-full">
                <HeroItem aspectRatio="16/9" maxHeight={600}>
                  <HeroBackground />
                  <HeroContent contentPosition="center">
                    <HeroSubtitle />
                    <HeroTitle />
                    <HeroDescription />
                    <Flex class="gap-3 mt-4">
                      <HeroCtaPrimary />
                    </Flex>
                  </HeroContent>
                </HeroItem>
              </CarouselItem>
            </HeroItemsView>
          </HeroItems>
        </CarouselContent>
        <CarouselNext class="right-4" />
        <CarouselPrevious class="left-4" />
      </Carousel>
    </HeroRoot>
  )
}

function CategorySection() {
  return (
    <section class="py-12 bg-background">
      <div class="container mx-auto px-4">
        <Text variant="h2" class="text-2xl font-bold mb-8">Shop by Category</Text>
        <CategoryList mode="root">
          <CategoryListEmptyView />
          <Grid cols={2} colsSm={2} colsMd={3} colsLg={4}>
            <CategoryListView>
              <Category href="categories" class="group m-1">
                <div class="relative overflow-hidden rounded-lg">
                  <CategoryImage class="w-full aspect-square object-cover transition-transform group-hover:scale-105" />
                </div>
                <div class="p-4 text-center">
                  <CategoryName class="font-semibold group-hover:text-primary transition-colors" />
                </div>
              </Category>
            </CategoryListView>
          </Grid>
        </CategoryList>
      </div>
    </section>
  )
}

function SectionTitle(props: { title: string }) {
  return (
    <Text variant="h2" class="text-2xl font-bold mb-8">
      {props.title}
    </Text>
  )
}

function ProductCard() {
  return (
    <Product class="group bg-white rounded-lg border m-1 overflow-hidden hover:shadow-lg transition-all duration-200">
      <div class="relative overflow-hidden">
        <ProductImage class="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105" />
        <div class="absolute top-2 right-2">
          <ProductToggleWishlistTrigger class="p-2 bg-white/90 rounded-full hover:bg-white" />
        </div>
        <div class="absolute bottom-2 left-2">
          <ProductStockBadge class="text-xs" />
        </div>
      </div>
      <div class="p-4">
        <ProductName class="font-medium line-clamp-2 min-h-[2.5rem]" />
        <div class="flex items-baseline gap-2 mt-2">
          <ProductPrice class="text-lg font-bold text-primary" />
        </div>
        <div class="mt-4">
          <ProductAddToCartTrigger class="w-full" />
        </div>
      </div>
    </Product>
  )
}

function NewArrivalsSection() {
  return (
    <section class="py-12 bg-muted/30">
      <div class="container mx-auto px-4">
        <RecommendationsRoot type="newest" limit={8}>
          <RecommendationsItems>
            <RecommendationsContent>
              <SectionTitle title="New Arrivals" />
              <Grid cols={2} colsSm={2} colsMd={3} colsLg={4}>
                <RecommendationsItemsView >
                  <ProductCard />
                </RecommendationsItemsView>
              </Grid>
            </RecommendationsContent>
          </RecommendationsItems>
        </RecommendationsRoot>
      </div>
    </section>
  )
}

function PopularProductsSection() {
  return (
    <section class="py-12 bg-background">
      <div class="container mx-auto px-4">
        <RecommendationsRoot type="popular" limit={8}>
          <SectionTitle title="Popular Products" />
          <RecommendationsItems>
            <RecommendationsContent>
              <SectionTitle title="Popular Products" />
              <Grid cols={2} colsSm={2} colsMd={3} colsLg={4}>
                <RecommendationsItemsView>
                  <ProductCard />
                </RecommendationsItemsView>
              </Grid>
            </RecommendationsContent>
          </RecommendationsItems>
        </RecommendationsRoot>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <NewArrivalsSection />
      <PopularProductsSection />
    </>
  )
}
