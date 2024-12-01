"use server";
import CreatePoll from "@/components/create-poll/create-poll-form";
import { Polls } from "@/components/polls";
import { Button } from "@/components/ui/button";
import { NextPageProps } from "@/interfaces/navigation";
import { getPolls } from "@/services/api-open";
import { Link } from "@/utils/navigation";
import { PATH } from "@/utils/navigation/config";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight } from "lucide-react";

import { getTranslations } from "next-intl/server";
export default async function Page(props: NextPageProps) {
  const params = await props.params;
  const t = await getTranslations("HomePage");
  const user = await currentUser();

  if (!user) {
    return (
      <div className="flex w-full flex-col">
        <div className="flex h-full flex-col items-center justify-center gap-5">
          <span className="text-6xl md:text-9xl">{t("title")}</span>
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
      </div>
    );
  }

  const polls = await getPolls();

  return (
    <div className="space-y-10">
      <div>Hi {user.username}</div>
      <div className="flex flex-col gap-20">
        <div className="grid grid-cols-2">
          <div className="flex items-center justify-center">
            <div className="flex flex-row items-center gap-10">
              <h1 className="text-6xl">Create a poll</h1>
              <ArrowRight size={40} />
            </div>
          </div>
          <CreatePoll />
        </div>

        <div className="flex flex-col gap-10">
          <h2 className="text-4xl">Browse polls and vote 🚀</h2>
          <Polls />
        </div>
      </div>
    </div>
  );
}
