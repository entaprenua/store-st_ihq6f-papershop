# Category Page Execution Plan

## Route
`/categories/[slug]`

## Purpose
Display a category with its subcategories and products.

## Components Needed

| Component | Import |
|-----------|--------|
| `Category` | `~/components/ui/category` |
| `CategoryList` | `~/components/ui/category` |
| `CategoryListView` | `~/components/ui/category` |
| `CategoryName` | `~/components/ui/category` |
| `CategoryImage` | `~/components/ui/category` |
| `CategorySubcategories` | `~/components/ui/category` |
| `CategoryListContent` | `~/components/ui/category` |
| `ProductList` | `~/components/ui/product` |
| `ProductListView` | `~/components/ui/product` |
| `ProductListContent` | `~/components/ui/product` |
| `Grid` | `~/components/ui/grid` |
| `Product` | `~/components/ui/product` |
| `ProductImage` | `~/components/ui/product` |
| `ProductName` | `~/components/ui/product` |
| `ProductPrice` | `~/components/ui/product` |
| `ProductAddToCartTrigger` | `~/components/ui/product` |

## Structure

```tsx
import { useParams } from "@solidjs/router"

export default function CategoryPage() {
  const params = useParams()
  
  return (
    <div class="min-h-screen flex flex-col">
      <Header />
      <main class="flex-1">
        <Category slug={params.slug}>
          {/* Category Header */}
          <div class="container mx-auto px-4 py-8">
            <CategoryName class="text-3xl font-bold" />
          </div>
          
          {/* Subcategories */}
          <CategorySubcategories>
            <CategoryList>
              <CategoryListContent>
                <div class="container mx-auto px-4 mb-8">
                  <h2 class="text-xl font-semibold mb-4">Subcategories</h2>
                  <Grid cols={2} colsSm={2} colsMd={3} colsLg={4} gap={4}>
                    <CategoryListView>
                      <Category href="categories" class="group">
                        <CategoryImage class="w-full aspect-square object-cover rounded-lg" />
                        <CategoryName class="font-medium mt-2" />
                      </Category>
                    </CategoryListView>
                  </Grid>
                </div>
              </CategoryListContent>
            </CategoryList>
          </CategorySubcategories>
          
          {/* Products */}
          <div class="container mx-auto px-4 pb-12">
            <h2 class="text-xl font-semibold mb-4">Products</h2>
            <ProductList>
              <ProductListContent>
                <Grid cols={2} colsSm={2} colsMd={3} colsLg={4} gap={6}>
                  <ProductListView>
                    <Product class="group bg-white rounded-lg border m-1">
                      <div class="relative overflow-hidden rounded-lg">
                        <ProductImage class="w-full aspect-square object-cover transition-transform group-hover:scale-105" />
                      </div>
                      <div class="p-4">
                        <ProductName class="font-medium line-clamp-2" />
                        <ProductPrice class="font-bold mt-2" />
                        <ProductAddToCartTrigger class="w-full mt-4" />
                      </div>
                    </Product>
                  </ProductListView>
                </Grid>
              </ProductListContent>
            </ProductList>
          </div>
        </Category>
      </main>
      <Footer />
    </div>
  )
}
```

## Steps

1. Create `src/routes/categories/[slug].tsx`
2. Import `useParams` from `@solidjs/router`
3. Wrap content in `<Category slug={params.slug}>`
4. Add category header with CategoryName
5. Add subcategories section with CategorySubcategories
6. Add products section with ProductList
7. Use responsive Grid for layout
8. Run zclint to verify

## File Location
`templates/electronics/src/routes/categories/[slug].tsx`
