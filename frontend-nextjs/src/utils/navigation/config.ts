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
  LOGIN: "/login",
  CREATE_ACCOUNT: "/create-account",
  MY_PROFILE: "/my-profile",
} as const;

export const localePrefix = "always" satisfies LocalePrefix;

export const pathnames = {
  "/": "/",
  "/about": {
    "en-GB": "/about",
    "nb-NO": "/om",
  },
  "/login": {
    "en-GB": "/login",
    "nb-NO": "/logg-inn",
  },
  "/create-account": {
    "en-GB": "/create-account",
    "nb-NO": "/opprett-konto",
  },
  "/my-profile": {
    "en-GB": "/my-profile",
    "nb-NO": "/min-profil",
  },
  "/dashboard": {
    "en-GB": "/dashboard",
    "nb-NO": "/hjem",
  },
} satisfies Pathnames<typeof locales>;
