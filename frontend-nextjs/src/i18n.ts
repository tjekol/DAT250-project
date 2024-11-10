import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { Locale, locales } from "./utils/navigation/config";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
