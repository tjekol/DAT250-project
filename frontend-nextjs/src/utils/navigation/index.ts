import { createNavigation } from "next-intl/navigation";
import { localePrefix, locales, pathnames } from "./config";

export const { Link, redirect, usePathname, useRouter, permanentRedirect } =
  createNavigation({ locales, localePrefix, pathnames });
