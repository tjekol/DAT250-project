import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/utils/navigation";
import { Locale, PATH } from "@/utils/navigation/config";
import { MaxWidthWrapper } from "./max-width-wrapper";
import { Button, buttonVariants } from "./ui/button";

export async function Navbar({ locale }: { locale: Locale }) {
  const t = await getTranslations("Navbar");
  const user = await currentUser();

  return (
    <nav className="sticky inset-x-0 top-0 z-[100] h-16 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="z-40 flex font-semibold">
            {t("title")}
          </Link>

          <div className="flex h-full items-center space-x-4">
            {user ? (
              <>
                <SignOutButton>
                  <Button size="sm" variant="ghost">
                    {t("signOut")}
                  </Button>
                </SignOutButton>

                <Link
                  href={{
                    pathname: PATH.DASHBOARD,
                  }}
                >
                  {t("dashboard")}
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={PATH.POLLS}
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  {t("polls")}
                </Link>
                <Link
                  href={PATH.SIGN_IN}
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  {t("signIn")}
                </Link>

                <div className="h-8 w-px bg-gray-200" />

                <Link
                  href={PATH.SIGN_UP}
                  className={buttonVariants({
                    size: "sm",
                    className: "flex items-center gap-1.5",
                  })}
                >
                  {t("getStarted")} <ArrowRight className="size-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
