import { Loader } from "@/components/loader";
import { useAuth } from "@/hooks/auth";
import { appWithTranslation } from "next-i18next";

import { useToast } from "@/components/notification";
import "@/styles/globals.css";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  const makeToast = useToast();

  const AUTH_PARAM = Component.auth;
  const PAYMENT_PARAM = Component.paymentStatus;
  const BASIC_ACCESS_PARAM = Component.basicAccess;

  const { showPageLoader } = useAuth(
    AUTH_PARAM,
    PAYMENT_PARAM,
    BASIC_ACCESS_PARAM
  );
  const { logout } = useAuth();

  const mutationCache = new MutationCache({
    onError: (error) => {
      makeToast({
        type: "error",
        message: error.data.message,
      });
      if (error.status === 401) {
        logout();
      }
    },
  });
  const queryClient = new QueryClient({ mutationCache });

  if (showPageLoader) {
    return <Loader fullScreen={true} />;
  }
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme={Component.theme || null}
        >
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{}}
          />
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
export default appWithTranslation(MyApp);
