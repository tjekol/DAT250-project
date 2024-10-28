import { LocalePrefix, Pathnames } from "next-intl/routing";
import z from "zod";

export const LOCALE = {
  EN_GB: "en-GB",
  NB_NO: "nb-NO",
} as const;

export const localeSchema = z.nativeEnum(LOCALE);
export const locales = Object.values(LOCALE);
export type Locale = z.infer<typeof localeSchema>;
export const DEFAULT_LOCALE = LOCALE.EN_GB;

export const PATH = {
  HOME: "/",
  ABOUT: "/about",
  DASHBOARD: "/[id]/dashboard",
} as const;

export const localePrefix = "always" satisfies LocalePrefix;

export const pathnames = {
  "/": "/",
  "/about": {
    "en-GB": "/about",
    "nb-NO": "/om",
  },
  "/[id]/dashboard": {
    "en-GB": "/[id]/dashboard",
    "nb-NO": "/[id]/dashbord",
  },
} satisfies Pathnames<typeof locales>;
