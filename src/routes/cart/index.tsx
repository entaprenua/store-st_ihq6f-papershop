import { CartItems, CartItemsView, CartItemCheckbox, CartEmpty, CartSummary, CartClearTrigger, CartCheckoutTrigger, CartSubtotal, CartSelectedSubtotal } from "~/components/ui/cart"
import { Product, ProductImage, ProductName, ProductPrice, ProductQuantityActions, ProductRemoveFromCartTrigger } from "~/components/ui/product"
import { Button } from "~/components/ui/button"
import { Flex } from "~/components/ui/flex"
import { Text } from "~/components/ui/text"
import { Link } from "~/components/ui/link"

export default function CartPage() {
  return (
    <div class="container mx-auto px-4 py-8 max-w-6xl">
      <Text variant="h1" class="text-2xl font-bold mb-6">Shopping Cart</Text>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div class="lg:col-span-2">
          <CartItems>
            <CartItemsView>
              <div class="space-y-4">
                <div class="bg-white rounded-lg border p-4">
                  <Flex gap={4} align="start">
                    <CartItemCheckbox />
                    <Product class="flex gap-4 flex-1 min-w-0">
                      <ProductImage class="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
                      <div class="flex-1 min-w-0">
                        <ProductName class="font-medium truncate" />
                        <ProductPrice class="text-sm text-muted-foreground mt-1" />
                      </div>
                      <div class="flex items-center gap-3">
                        <ProductQuantityActions />
                        <div class="flex flex-col items-end gap-1">
                          <ProductRemoveFromCartTrigger class="text-muted-foreground hover:text-destructive" />
                        </div>
                      </div>
                    </Product>
                  </Flex>
                </div>
              </div>
            </CartItemsView>
            
            <CartEmpty>
              <div class="bg-white rounded-lg border p-12 text-center">
                <div class="text-6xl mb-4">🛒</div>
                <h2 class="text-xl font-medium mb-2">Your cart is empty</h2>
                <p class="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
                <Button as={Link} href="/products" class="px-6">
                  Browse Products
                </Button>
              </div>
            </CartEmpty>
          </CartItems>
        </div>

        {/* Order Summary */}
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg border p-6 sticky top-4">
            <Text variant="h2" class="text-lg font-semibold mb-4">Order Summary</Text>
            
            <div class="space-y-3 mb-6">
              <Flex justify="between">
                <Text class="text-muted-foreground">Subtotal</Text>
                <CartSubtotal />
              </Flex>
              <Flex justify="between">
                <Text class="text-muted-foreground">Shipping</Text>
                <Text class="text-muted-foreground">Calculated at checkout</Text>
              </Flex>
              <div class="border-t pt-3">
                <Flex justify="between">
                  <Text class="font-semibold">Total</Text>
                  <CartSelectedSubtotal />
                </Flex>
              </div>
            </div>

            <CartSummary>
              <CartCheckoutTrigger href="/checkout" class="w-full" />
              <CartClearTrigger variant="outline" class="w-full mt-3" />
            </CartSummary>

            <CartEmpty>
              <Button as={Link} href="/products" variant="outline" class="w-full">
                Continue Shopping
              </Button>
            </CartEmpty>
          </div>
        </div>
      </div>
    </div>
  )
}
