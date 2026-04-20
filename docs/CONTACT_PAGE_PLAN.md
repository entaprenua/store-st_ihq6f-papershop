# Contact Page Execution Plan

## Route
`/contact`

## Purpose
Provide a contact form for customer inquiries.

## Components Needed

| Component | Import |
|-----------|--------|
| `Input` | `~/components/ui/input` |
| `Button` | `~/components/ui/button` |
| `Text` | `~/components/ui/text` |
| `Flex` | `~/components/ui/flex` |

## Structure

```tsx
import { createSignal } from "solid-js"

export default function ContactPage() {
  const [name, setName] = createSignal("")
  const [email, setEmail] = createSignal("")
  const [subject, setSubject] = createSignal("")
  const [message, setMessage] = createSignal("")
  const [submitted, setSubmitted] = createSignal(false)

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    // TODO: Submit to API
    setSubmitted(true)
  }

  return (
    <div class="min-h-screen flex flex-col">
      <Header />
      <main class="flex-1">
        <div class="container mx-auto px-4 py-8">
          <h1 class="text-3xl font-bold mb-2">Contact Us</h1>
          <p class="text-muted-foreground mb-8">We'd love to hear from you. Send us a message!</p>
          
          <Flex justify="center">
            <div class="w-full max-w-xl">
              {submitted() ? (
                <div class="bg-white rounded-lg border p-8 text-center">
                  <h2 class="text-xl font-semibold mb-2">Thank You!</h2>
                  <p class="text-muted-foreground mb-4">Your message has been sent. We'll get back to you soon.</p>
                  <Button onClick={() => setSubmitted(false)}>Send Another Message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} class="bg-white rounded-lg border p-6 space-y-4">
                  <div>
                    <label class="block text-sm font-medium mb-1">Name</label>
                    <Input
                      type="text"
                      value={name()}
                      onInput={(e) => setName(e.currentTarget.value)}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium mb-1">Email</label>
                    <Input
                      type="email"
                      value={email()}
                      onInput={(e) => setEmail(e.currentTarget.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium mb-1">Subject</label>
                    <Input
                      type="text"
                      value={subject()}
                      onInput={(e) => setSubject(e.currentTarget.value)}
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium mb-1">Message</label>
                    <textarea
                      class="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={message()}
                      onInput={(e) => setMessage(e.currentTarget.value)}
                      placeholder="Your message..."
                      required
                    />
                  </div>
                  
                  <Button type="submit" class="w-full">Send Message</Button>
                </form>
              )}
              
              {/* Contact Info */}
              <div class="mt-8 text-center text-sm text-muted-foreground">
                <p>Or reach us directly at:</p>
                <p class="mt-1">support@electronics-store.com</p>
                <p>+1 (555) 123-4567</p>
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

1. Create `src/routes/contact.tsx`
2. Import `createSignal` from `solid-js`
3. Create form state with signals
4. Build form with name, email, subject, message fields
5. Add success state after submission
6. Add contact information
7. Run zclint to verify

## Notes

- Simple form with validation
- Shows success message after submission
- Contact info displayed below form
- TODO: Connect to actual API for form submission

## File Location
`templates/electronics/src/routes/contact.tsx`
