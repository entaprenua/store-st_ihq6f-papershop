import { ProductList, ProductListView, ProductListEmptyView, ProductListContent, ProductSearch } from "~/components/ui/product"
import { Product, ProductImage, ProductName, ProductPrice, ProductStockBadge, ProductToggleWishlistTrigger, ProductAddToCartTrigger } from "~/components/ui/product"
import { Search, SearchControl, SearchInput, SearchContent, SearchListbox, SearchItem, SearchNoResult } from "~/components/ui/search"
import { Grid } from "~/components/ui/grid"
import { Flex } from "~/components/ui/flex"
import { Text } from "~/components/ui/text"

function SectionTitle(props: { title: string }) {
  return (
    <Text variant="h1" class="text-3xl font-bold mb-8">
      {props.title}
    </Text>
  )
}

function ProductCard() {
  return (
    <Product href="/products" class="group bg-white rounded-lg border m-1 overflow-hidden hover:shadow-lg transition-all duration-200">
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

function SearchSection() {
  return (
    <div class="mb-8">
      <ProductSearch
        class="w-full md:w-96"
        itemComponent={
          <SearchItem>
            <Product href="/products">
              <Flex class="items-center gap-3">
                <ProductImage class="w-12 h-12 object-cover rounded" />
                <div>
                  <ProductName class="font-medium" />
                  <ProductPrice class="text-sm text-muted-foreground" />
                </div>
              </Flex>
            </Product>
          </SearchItem>
        }
      >
        <SearchControl>
          <SearchInput placeholder="Search products..." />
        </SearchControl>
        <SearchContent>
          <SearchListbox />
          <SearchNoResult class="px-4 py-2 text-sm text-muted-foreground">
            No products found
          </SearchNoResult>
        </SearchContent>
      </ProductSearch>
    </div>
  )
}

function ProductsSection() {
  return (
    <ProductList>
      <ProductListEmptyView />
      <ProductListContent>
        <Grid cols={2} colsSm={2} colsMd={3} colsLg={4}>
          <ProductListView>
            <ProductCard />
          </ProductListView>
        </Grid>
      </ProductListContent>
    </ProductList>
  )
}

export default function ProductsPage() {
  return (
    <div class="container mx-auto px-4 py-8">
      <SectionTitle title="All Products" />
      <SearchSection />
      <ProductsSection />
    </div>
  )
}
