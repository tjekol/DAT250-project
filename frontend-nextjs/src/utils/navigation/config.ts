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
  SIGN_UP: "/sign-up",
  CREATE_ACCOUNT: "/create-account",
  POLLS: "/polls",
  POLL: (id: string) => `/${id}` as `/[id]`,
} as const;

export const localePrefix = "always" satisfies LocalePrefix;

export const pathnames = {
  "/": "/",
  "/about": {
    "en-GB": "/about",
    "nb-NO": "/om",
  },
  "/sign-in": {
    "en-GB": "/sign-in",
    "nb-NO": "/sign-in",
  },
  "/sign-up": {
    "en-GB": "/sign-up",
    "nb-NO": "/sign-up",
  },
  "/create-account": {
    "en-GB": "/create-account",
    "nb-NO": "/opprett-konto",
  },
  "/dashboard": {
    "en-GB": "/dashboard",
    "nb-NO": "/hjem",
  },
  "/polls": {
    "en-GB": "/polls",
    "nb-NO": "/avstemninger",
  },
  "/[id]": {
    "en-GB": "/[id]",
    "nb-NO": "/[id]",
  },
} satisfies Pathnames<typeof locales>;
