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
  DASHBOARD: "/dashboard",
  SIGN_IN: "/sign-in",
  CREATE_ACCOUNT: "/create-account",
} as const;

export const localePrefix = "always" satisfies LocalePrefix;

export const pathnames = {
  "/": "/",
  "/about": {
    "en-GB": "/about",
    "nb-NO": "/om",
  },
  "/dashboard": {
    "en-GB": "/dashboard",
    "nb-NO": "/hjem",
  },
  "/sign-in": {
    "en-GB": "/sign-in",
    "nb-NO": "/logg-inn",
  },
  "/create-account": {
    "en-GB": "/create-account",
    "nb-NO": "/opprett-konto",
  },
} satisfies Pathnames<typeof locales>;
