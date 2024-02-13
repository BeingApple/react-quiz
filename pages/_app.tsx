import "@/styles/globals.css";
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps: { dehydratedState, ...restPageProps } }: AppProps) {
const [queryClient] = useState(() => new QueryClient())

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <Component {...restPageProps} />
        </HydrationBoundary>
      </QueryClientProvider>
    </>
  );
}
