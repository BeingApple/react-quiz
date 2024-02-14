import "@/styles/globals.css";
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from 'react-redux'
import { useState } from "react";
import { store } from '@/store/store'
import Head from "next/head";
import { CssBaseline } from "@mui/material";

export default function App({ Component, pageProps: { dehydratedState, ...restPageProps } }: AppProps) {
const [queryClient] = useState(() => new QueryClient())

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={dehydratedState}>
            <CssBaseline />
            <Component {...restPageProps} />
          </HydrationBoundary>
        </QueryClientProvider>
      </ReduxProvider>
    </>
  );
}
