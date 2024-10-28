import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Params } from "@/interfaces";
import { PageWrapper } from "@/utils/page-wrapper";
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
          <PageWrapper>
            {/* <Providers> TODO: Enable theme switch. MUST FIX HYDRATION MISMATCH */}
            {children}
            {/* </Providers> */}
          </PageWrapper>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
