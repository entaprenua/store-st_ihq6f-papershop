import { A } from "@solidjs/router"
import { Category, CategoryList, CategoryListView, CategoryListContent, CategoryName, CategoryImage, CategorySubcategories } from "~/components/ui/category"
import { ProductList, ProductListView, ProductListContent } from "~/components/ui/product"
import { Product, ProductImage, ProductName, ProductPrice, ProductStockBadge, ProductToggleWishlistTrigger, ProductAddToCartTrigger } from "~/components/ui/product"
import { Grid } from "~/components/ui/grid"
import { Text } from "~/components/ui/text"

function CategoryCard() {
  return (
    <Category href="categories" class="group m-1">
      <div class="relative overflow-hidden rounded-lg">
        <CategoryImage class="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div class="p-4 text-center">
        <CategoryName class="font-semibold group-hover:text-primary transition-colors" />
      </div>
    </Category>
  )
}

function ProductCard() {
  return (
    <Product href="products" class="group bg-white rounded-lg border m-1 overflow-hidden hover:shadow-lg transition-all duration-200">
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

export default function CategoryPage() {
  return (
    <Category>
      <div class="container mx-auto px-4 py-8">
        <nav class="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <A href="/" class="hover:text-foreground transition-colors">Home</A>
          <span>/</span>
          <A href="/categories" class="hover:text-foreground transition-colors">Categories</A>
          <span>/</span>
          <span class="text-foreground"><CategoryName /></span>
        </nav>
        <Text variant="h1" class="text-3xl font-bold mb-8">
          <CategoryName />
        </Text>
      </div>

      <CategorySubcategories>
        <CategoryListContent>
          <div class="container mx-auto px-4 pb-8">
            <Text variant="h2" class="text-xl font-semibold mb-4">Subcategories</Text>
            <Grid cols={2} colsSm={2} colsMd={3} colsLg={4}>
              <CategoryListView>
                <CategoryCard />
              </CategoryListView>
            </Grid>
          </div>
        </CategoryListContent>
      </CategorySubcategories>

      <div class="container mx-auto px-4 pb-12">
        <ProductList>
          <ProductListContent>
            <Text variant="h2" class="text-xl font-semibold mb-4">Products</Text>
            <Grid cols={2} colsSm={2} colsMd={3} colsLg={4}>
              <ProductListView>
                <ProductCard />
              </ProductListView>
            </Grid>
          </ProductListContent>
        </ProductList>
      </div>
    </Category>
  )
}
