import { clientOnly } from "@solidjs/start"
import { Suspense } from "solid-js"
import { Header } from "~/components/Header"
import { Footer } from "~/components/Header"
import { Flex } from "~/components/ui/flex"

/* FIXME: having issue with ssr, so we rap around clinet only for now, solution under way */
export default clientOnly(async () => ({ default: Home }), { lazy: true })

function Home(props) {
  return (
    <>
      <Header />
      <Suspense fallback={
        <Flex class="min-h-[calc(100vh-5rem)] items-center justify-center">
          <div class="animate-pulse text-muted-foreground">Loading...</div>
        </Flex>
      }>
        {props.children}
      </Suspense>
      <Footer />
    </>
  )
}
