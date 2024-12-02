import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Params } from "@/interfaces/navigation";
import { LOCALE, PATH } from "@/utils/navigation/config";
import { nbNO } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter } from "next/font/google";
import "../globals.css";
import { ReactQueryClientProvider } from "./react-query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Poll App",
  description: "A nice poll app",
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<Params>;
}) {
  const params = await props.params;
  const { locale } = params;
  const { children } = props;
  const messages = await getMessages();
  const queryClient = new QueryClient();
  let clerkLocale;
  switch (locale) {
    case LOCALE.NB_NO:
      clerkLocale = nbNO;
      break;
  }
  return (
    <ClerkProvider
      localization={clerkLocale}
      signUpFallbackRedirectUrl={`${locale}/${PATH.CREATE_ACCOUNT}`}
      signInFallbackRedirectUrl={`${locale}/${PATH.DASHBOARD}`}
    >
      <html lang={locale}>
        <body className={inter.className}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ReactQueryClientProvider>
              <ReactQueryDevtools initialIsOpen={false} />
              <div className="flex min-h-screen w-full flex-col">
                <Navbar locale={locale} />
                <div className="sm:min-w-lg mx-auto flex w-full max-w-7xl">
                  <div className="mx-0 flex min-h-[calc(100vh)] w-full p-10">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 -top-40 z-[-1] transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    >
                      <div
                        style={{
                          clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                      />
                    </div>
                    {/* <Providers> TODO: Enable theme switch. */}
                    <div className="h-full w-full">{children}</div>
                    {/* </Providers> */}
                  </div>
                </div>
              </div>
              <Footer />
            </ReactQueryClientProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
