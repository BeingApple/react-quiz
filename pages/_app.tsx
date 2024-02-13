import "@/styles/globals.css";
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from 'react-redux'
import { useState } from "react";
import { store } from '@/store/store'

export default function App({ Component, pageProps: { dehydratedState, ...restPageProps } }: AppProps) {
const [queryClient] = useState(() => new QueryClient())

  return (
    <>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={dehydratedState}>
            <Component {...restPageProps} />
          </HydrationBoundary>
        </QueryClientProvider>
      </ReduxProvider>
    </>
  );
}
