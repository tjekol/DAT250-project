import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_LOCALE,
  localePrefix,
  locales,
  localeSchema,
  pathnames,
} from "./utils/navigation/config";

const isProtectedRoute = createRouteMatcher(["/:locale/dashboard(.*)"]);

const handleI18nRouting = createIntlMiddleware({
  locales,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix,
  pathnames,
});

function redirectToDefaultLocale(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const segments = pathname.split("/");
  const locale = segments[1];
  if (!localeSchema.safeParse(locale).success) {
    const restOfPath = segments.slice(2).join("/");
    const url = new URL(`/${DEFAULT_LOCALE}/${restOfPath}`, req.nextUrl.origin);
    return NextResponse.redirect(url);
  }
}

export default clerkMiddleware(async (auth, req) => {
  console.log("middleware", req.nextUrl.pathname);
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // do not localize api routes
  const path = req.nextUrl.pathname;
  if (path.includes("/api")) {
    return;
  }
  const redirectResponse = redirectToDefaultLocale(req);
  if (redirectResponse) {
    return redirectResponse;
  }
  return handleI18nRouting(req);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
