import chain from "@nimpl/middleware-chain";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_LOCALE,
  localePrefix,
  locales,
  localeSchema,
  pathnames,
} from "./utils/navigation/config";

const handleI18nRouting = createIntlMiddleware({
  locales,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix,
  pathnames,
});

function redirectToDefaultLocale(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const firstSegment = pathname.split("/")[1];

  if (!localeSchema.safeParse(firstSegment).success) {
    const url = new URL(`/${DEFAULT_LOCALE}${pathname}`, req.nextUrl.origin);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export default chain([handleI18nRouting, redirectToDefaultLocale]);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
