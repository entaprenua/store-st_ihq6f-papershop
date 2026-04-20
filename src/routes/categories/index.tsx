import { CategoryList, CategoryListEmptyView, CategoryListView, CategoryListContent, Category, CategoryName, CategoryImage } from "~/components/ui/category"
import { Grid } from "~/components/ui/grid"
import { Text } from "~/components/ui/text"

export default function CategoriesPage() {
  return (
    <div class="container mx-auto px-4 py-8">
      <Text variant="h1" class="text-3xl font-bold mb-8">All Categories</Text>

      <CategoryList mode="root">
        <CategoryListEmptyView />
        <CategoryListContent>
          <Grid cols={2} colsSm={2} colsMd={3} colsLg={4}>
            <CategoryListView>
              <Category href="categories" class="group m-1">
                <div class="relative overflow-hidden rounded-lg">
                  <CategoryImage class="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div class="p-4 text-center">
                  <CategoryName class="font-semibold group-hover:text-primary transition-colors" />
                </div>
              </Category>
            </CategoryListView>
          </Grid>
        </CategoryListContent>
      </CategoryList>
    </div>
  )
}
