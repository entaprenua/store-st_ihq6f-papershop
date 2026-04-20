import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { MetaProvider } from "@solidjs/meta";
import { AuthProvider } from "~/lib/guards/auth";
import { StoreProvider } from "~/components/ui/store";
import { ColorMode } from "~/components/ui/color-mode"
import { CartProvider } from "~/components/ui/cart"
import { OrderProvider } from "~/components/ui/order"
import { ErrorBoundary, ErrorBoundaryMessage, ErrorBoundaryResetButton } from "~/components/ui/error-boundary"
import { Flex } from "~/components/ui/flex"
import { Text } from "~/components/ui/text"
import { QueryClient } from "~/components/ui/query-client"
import AlertTriangleIcon from "lucide-solid/icons/alert-triangle"
import "./app.css";
import RootLayout from "./root-layout"

/* FIXME: currently, ErrorBoundary in ssr mode is loading infinetly so we  wrapped it in client-only,
* thus ssr is disabled. Solution is under way
* */
export default function App() {

  return (
    <MetaProvider>
      <ColorMode>
        <ErrorBoundary
          fallback={
            <Flex class="min-h-screen w-full flex-col items-center justify-center gap-6 bg-background p-8">
              <div class="rounded-full bg-destructive/10 p-6">
                <AlertTriangleIcon class="h-12 w-12 text-destructive" />
              </div>
              <Flex class="flex-col items-center gap-2 text-center">
                <Text variant="h2" class="font-bold">Something went wrong</Text>
                <Text variant="body1" class="text-muted-foreground max-w-md">
                  <ErrorBoundaryMessage />
                </Text>
              </Flex>
              <ErrorBoundaryResetButton class="px-8">
                Try Again
              </ErrorBoundaryResetButton>
            </Flex>
          }
        >
          <QueryClient>
            <StoreProvider publicId="st_ihq6ff6ct2w9">
              <AuthProvider>
                <OrderProvider>
                  <CartProvider>
                    <Router
                      root={RootLayout}
                    >
                      <FileRoutes />
                    </Router>
                  </CartProvider>
                </OrderProvider>
              </AuthProvider>
            </StoreProvider>
          </QueryClient>
        </ErrorBoundary>
      </ColorMode>
    </MetaProvider>
  );
}
