"use server";
import { Button } from "@/components/ui/button";
import { NextPageProps } from "@/interfaces/navigation";
import { Link } from "@/utils/navigation";
import { PATH } from "@/utils/navigation/config";

import { getTranslations } from "next-intl/server";
export default async function Page(props: NextPageProps) {
  const params = await props.params;
  const t = await getTranslations("HomePage");

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5 text-6xl md:text-9xl">
      <span className="">{t("title")}</span>
      <Button className="w-fit" asChild>
        <Link
          href={{
            pathname: PATH.SIGN_UP,
          }}
        >
          {t("submit")}
        </Link>
      </Button>
    </div>
  );
}
