"use server";
import CreatePoll from "@/components/create-poll/create-poll-form";
import { Poll } from "@/components/poll";
import { Button } from "@/components/ui/button";
import { NextPageProps } from "@/interfaces/navigation";
import { getPolls } from "@/services";
import { Link } from "@/utils/navigation";
import { PATH } from "@/utils/navigation/config";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight } from "lucide-react";

import { getTranslations } from "next-intl/server";
export default async function Page(props: NextPageProps) {
  const params = await props.params;
  const t = await getTranslations("HomePage");
  const user = await currentUser();

  const GRADIENT = (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -top-40 z-[-1] transform-gpu overflow-hidden blur-3xl sm:-top-80"
    >
      <div
        style={{
          clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
        }}
        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
      />
    </div>
  );

  if (!user) {
    return (
      <div className="flex w-full flex-col">
        {GRADIENT}
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
    <div className="h-full space-y-10">
      {GRADIENT}
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
          <div className="grid grid-flow-row grid-cols-3 gap-10">
            {polls?.map((poll, index) => <Poll key={index} poll={poll} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
