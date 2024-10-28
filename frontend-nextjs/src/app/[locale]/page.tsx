import { Button } from "@/components/button";
import { NextPageProps } from "@/interfaces";
import { Link } from "@/utils/navigation";
import { PATH } from "@/utils/navigation/config";
import { getTranslations } from "next-intl/server";

export default async function Page(props: NextPageProps) {
  const params = await props.params;
  const t = await getTranslations("HomePage");
  return (
    <div className="flex flex-col gap-10">
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-5 text-9xl">
          <span>{t("title")}</span>
          <Button className="w-fit" asChild>
            <Link
              href={{
                pathname: PATH.DASHBOARD,
                params: { id: "1" },
              }}
            >
              {t("submit")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
