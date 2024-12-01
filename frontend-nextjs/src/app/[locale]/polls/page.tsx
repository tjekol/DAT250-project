"use server";
import { Polls } from "@/components/polls";
import { NextPageProps } from "@/interfaces/navigation";

import { getTranslations } from "next-intl/server";
export default async function Page(props: NextPageProps) {
  const params = await props.params;
  const t = await getTranslations("HomePage");

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-20">
        <div className="flex flex-col gap-10">
          <h2 className="text-4xl">Browse polls🚀</h2>
          <Polls />
        </div>
      </div>
    </div>
  );
}
