import { Text } from "~/components/ui/text"
import { Flex } from "~/components/ui/flex"

export default function AboutPage() {
  return (
    <div class="container mx-auto px-4 py-8">
      <Text variant="h1" class="text-3xl font-bold mb-8">About Us</Text>
      
      <div class="max-w-3xl space-y-6">
        <div class="bg-white rounded-lg border p-6">
          <Text variant="h2" class="text-xl font-semibold mb-4">Our Story</Text>
          <Text variant="body1" class="text-muted-foreground">
            TechStore was founded in 2020 with a simple mission: to provide the latest electronics at the best prices. 
            What started as a small online shop has grown into one of the most trusted retailers for tech enthusiasts worldwide.
          </Text>
        </div>
        
        <div class="bg-white rounded-lg border p-6">
          <Text variant="h2" class="text-xl font-semibold mb-4">Our Mission</Text>
          <Text variant="body1" class="text-muted-foreground">
            We believe everyone deserves access to cutting-edge technology. That's why we work tirelessly to bring you 
            the newest gadgets, most competitive prices, and exceptional customer service.
          </Text>
        </div>
        
        <div class="bg-white rounded-lg border p-6">
          <Text variant="h2" class="text-xl font-semibold mb-4">Why Choose Us?</Text>
          <Flex class="flex-col gap-3">
            <Flex class="items-center gap-3">
              <span class="text-primary">✓</span>
              <Text variant="body1">Free shipping on orders over $50</Text>
            </Flex>
            <Flex class="items-center gap-3">
              <span class="text-primary">✓</span>
              <Text variant="body1">30-day hassle-free returns</Text>
            </Flex>
            <Flex class="items-center gap-3">
              <span class="text-primary">✓</span>
              <Text variant="body1">Expert customer support</Text>
            </Flex>
            <Flex class="items-center gap-3">
              <span class="text-primary">✓</span>
              <Text variant="body1">Secure payment processing</Text>
            </Flex>
          </Flex>
        </div>
        
        <div class="bg-white rounded-lg border p-6">
          <Text variant="h2" class="text-xl font-semibold mb-4">Contact Us</Text>
          <Text variant="body1" class="text-muted-foreground">
            Have questions? We'd love to hear from you. Reach out to us at support@techstore.com 
            or call us at +1 (555) 123-4567.
          </Text>
        </div>
      </div>
    </div>
  )
}
