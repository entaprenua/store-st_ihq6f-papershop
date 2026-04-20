# Cart Page Execution Plan

## Route
`/cart`

## Purpose
Display shopping cart with items, quantities, and checkout options.

## Components Needed

| Component | Import |
|-----------|--------|
| `CartItems` | `~/components/ui/cart` |
| `CartItemsView` | `~/components/ui/cart` |
| `CartItemCheckbox` | `~/components/ui/cart` |
| `CartEmpty` | `~/components/ui/cart` |
| `CartSummary` | `~/components/ui/cart` |
| `CartCheckoutTrigger` | `~/components/ui/cart` |
| `CartClearTrigger` | `~/components/ui/cart` |
| `Product` | `~/components/ui/product` |
| `ProductImage` | `~/components/ui/product` |
| `ProductName` | `~/components/ui/product` |
| `ProductPrice` | `~/components/ui/product` |
| `ProductQuantityActions` | `~/components/ui/product` |
| `ProductRemoveFromCartTrigger` | `~/components/ui/product` |
| `Button` | `~/components/ui/button` |
| `Flex` | `~/components/ui/flex` |

## Structure

```tsx
export default function CartPage() {
  return (
    <div class="min-h-screen flex flex-col">
      <Header />
      <main class="flex-1">
        <div class="container mx-auto px-4 py-8">
          <h1 class="text-3xl font-bold mb-8">Shopping Cart</h1>
          
          <Flex gap={8}>
            {/* Cart Items */}
            <div class="flex-1">
              <CartItems>
                <CartItemsView>
                  <div class="bg-white rounded-lg border p-4 mb-4">
                    <Flex gap={4} align="start">
                      <CartItemCheckbox />
                      <Product class="flex gap-4">
                        <ProductImage class="w-24 h-24 object-cover rounded" />
                        <div class="flex-1">
                          <ProductName class="font-medium" />
                          <ProductPrice class="mt-1" />
                        </div>
                      </Product>
                      <ProductQuantityActions />
                      <ProductRemoveFromCartTrigger />
                    </Flex>
                  </div>
                </CartItemsView>
                <CartEmpty>
                  <div class="text-center py-12">
                    <h2 class="text-xl font-medium mb-2">Your cart is empty</h2>
                    <p class="text-muted-foreground mb-4">Add some products to get started</p>
                    <Button href="/products">Browse Products</Button>
                  </div>
                </CartEmpty>
              </CartItems>
            </div>
            
            {/* Cart Summary */}
            <div class="w-full md:w-80">
              <div class="bg-white rounded-lg border p-6 sticky top-4">
                <h2 class="text-lg font-semibold mb-4">Order Summary</h2>
                <CartSummary>
                  <CartClearTrigger class="w-full mt-4" />
                  <CartCheckoutTrigger href="/checkout" class="w-full mt-4" />
                </CartSummary>
              </div>
            </div>
          </Flex>
        </div>
      </main>
      <Footer />
    </div>
  )
}
```

## Steps

1. Create `src/routes/cart.tsx` (or `src/routes/cart/index.tsx`)
2. Import all necessary cart and product components
3. Create two-column layout (items + summary)
4. Add CartItems with product display
5. Add CartEmpty for empty state message
6. Add CartSummary with clear and checkout buttons
7. Run zclint to verify

## Notes

- `CartEmpty` shows when cart has no items
- `CartSummary` includes subtotal and total
- `CartCheckoutTrigger` transfers selected items to order context

## File Location
`templates/electronics/src/routes/cart.tsx`
