import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NextPageProps } from "@/interfaces/navigation";
import { getPoll } from "@/services";
import { getTranslations } from "next-intl/server";
import VoteForm from "./vote.form";
export default async function Page(props: NextPageProps) {
  const params = await props.params;
  const t = await getTranslations("PollPage");
  const poll = await getPoll(params.id!);
  const {
    question,
    username,
    validUntil,
    public: isPublic,
    voteOptions,
    pollID,
  } = poll;
  const date = new Date(validUntil).toLocaleDateString();
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>{question}</CardTitle>
        <CardDescription>
          {t("creator")} <b>{username}</b>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          {t("validUntil")} {date}
        </div>
        <div>
          <VoteForm
            voteOptions={voteOptions}
            pollID={pollID}
            username={username}
            public={isPublic}
          />
        </div>
      </CardContent>
    </Card>
  );
}
