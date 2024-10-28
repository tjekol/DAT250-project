import { Locale } from "@/utils/navigation/config";

export type Params = {
  locale: Locale;
  id?: string;
};

export type NextPageProps = {
  params: Promise<Params>;
  searchParams: Promise<Record<string, string>>;
};
