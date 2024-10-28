import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Params } from "@/interfaces";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter } from "next/font/google";
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
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <div className="mt-4 flex min-h-screen w-full flex-col sm:mt-12">
            <div className="sm:min-w-lg mx-auto flex w-full max-w-7xl items-center p-4">
              <div className="flex w-full flex-col gap-10">
                {/* <Providers> TODO: Enable theme switch. MUST FIX HYDRATION MISMATCH */}
                {children}
                {/* </Providers> */}
              </div>
            </div>
          </div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
