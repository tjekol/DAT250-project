import { Poll } from "@/components/poll";
import { NextPageProps } from "@/interfaces/navigation";
import { getPolls } from "@/services";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page(props: NextPageProps) {
  const user = await currentUser();
  const username = user?.username;
  const polls = await getPolls();

  const userPolls = polls.filter((poll) => poll.username === username);
  return (
    <div className="space-y-10">
      <div>Hi {user?.username}</div>
      <div className="flex flex-col gap-20">
        <div className="grid grid-cols-2"></div>

        <div className="flex flex-col gap-10">
          <h2 className="text-4xl">Your polls 🚀</h2>
          <div className="grid grid-flow-row grid-cols-3 gap-10">
            {userPolls?.map((poll, index) => <Poll key={index} poll={poll} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
