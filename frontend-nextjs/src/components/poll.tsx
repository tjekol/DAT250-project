import { type Poll } from "@/interfaces";
import { cn } from "@/utils/cn";
import { Link } from "@/utils/navigation";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface PollProps {
  poll: Poll;
  className?: string;
}
export function Poll({ poll, className }: PollProps) {
  const { question, username, validUntil, isPublic, voteOptions, pollID } =
    poll;
  const date = new Date(validUntil).toLocaleDateString();
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>{question}</CardTitle>
        <CardDescription>
          Created by: <b>{username}</b>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>Valid until: {date}</div>
        <div>Public: {isPublic ? "Yes" : "No"}</div>
        <div>
          <RadioGroup defaultValue="comfortable">
            {voteOptions.map((option) => {
              const idToString = option.id.toString();
              return (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.caption} id={idToString} />
                  <Label htmlFor={idToString}>
                    {option.caption}: {option.votes}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href={{ params: { id: pollID }, pathname: "/[id]" }}>
            Go to poll
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
