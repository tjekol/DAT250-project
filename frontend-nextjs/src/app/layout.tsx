import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Params } from "@/interfaces/navigation";
import { QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter } from "next/font/google";
import { ReactQueryClientProvider } from "./[locale]/react-query-provider";
import "./globals.css";

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

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ReactQueryClientProvider>
            <div className="flex min-h-screen w-full flex-col">
              <Navbar />
              <div className="sm:min-w-lg mx-auto flex w-full max-w-7xl items-center p-4">
                <div className="flex w-full flex-col gap-10">
                  {/* <Providers> TODO: Enable theme switch. MUST FIX HYDRATION MISMATCH */}
                  {children}
                  {/* </Providers> */}
                </div>
              </div>
            </div>
            <Footer />
          </ReactQueryClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
