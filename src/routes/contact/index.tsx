import { Button } from "~/components/ui/button"
import { Text } from "~/components/ui/text"
import { Flex } from "~/components/ui/flex"

export default function ContactPage() {
  return (
    <div class="container mx-auto px-4 py-8">
      <Text variant="h1" class="text-3xl font-bold mb-2">Contact Us</Text>
      <Text variant="body1" class="text-muted-foreground mb-8">We'd love to hear from you. Send us a message!</Text>

      <Flex class="justify-center">
        <div class="w-full max-w-xl">
          <div class="bg-white rounded-lg border p-6 space-y-4">
            <div>
              <Text variant="body2" class="block text-sm font-medium mb-1">Name</Text>
              <input type="text" placeholder="Your name" />
            </div>

            <div>
              <Text variant="body2" class="block text-sm font-medium mb-1">Email</Text>
              <input type="email" placeholder="your@email.com" />
            </div>

            <div>
              <Text variant="body2" class="block text-sm font-medium mb-1">Subject</Text>
              <input type="text" placeholder="How can we help?" />
            </div>

            <div>
              <Text variant="body2" class="block text-sm font-medium mb-1">Message</Text>
              <textarea class="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Your message..." />
            </div>

            <Button class="w-full">Send Message</Button>
          </div>

          <div class="mt-8 text-center text-sm text-muted-foreground">
            <Text variant="body2">Or reach us directly at:</Text>
            <Text variant="body2" class="mt-1">support@electronics-store.com</Text>
            <Text variant="body2">+1 (555) 123-4567</Text>
          </div>
        </div>
      </Flex>
    </div>
  )
}
