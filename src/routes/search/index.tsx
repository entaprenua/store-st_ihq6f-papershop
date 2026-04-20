import { ProductSearch } from "~/components/ui/product"
import { Search, SearchItem, SearchControl, SearchInput, SearchContent, SearchListbox, SearchNoResult } from "~/components/ui/search"
import { Product, ProductImage, ProductName, ProductPrice } from "~/components/ui/product"
import { Flex } from "~/components/ui/flex"
import { Text } from "~/components/ui/text"

export default function SearchPage() {
  return (
    <div class="container mx-auto px-4 py-8">
      <Text variant="h1" class="text-3xl font-bold mb-8">Search Products</Text>
      
      <div class="max-w-xl">
        <ProductSearch
          class="w-full"
          itemComponent={
            <SearchItem>
              <Product href="products">
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
            <SearchInput placeholder="Search for products..." />
          </SearchControl>
          <SearchContent>
            <SearchListbox />
            <SearchNoResult class="px-4 py-2 text-sm text-muted-foreground">
              No products found
            </SearchNoResult>
          </SearchContent>
        </ProductSearch>
      </div>
    </div>
  )
}
