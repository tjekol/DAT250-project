"use client";

import { Form } from "@/components/form";
import { RadioGroupSelect } from "@/components/form/input/radio-goup";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { VoteOption } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { voteOnPollAction } from "./vote.action";
import { voteSchema } from "./vote.schema";

export default function VoteForm({
  voteOptions,
  pollID,
  username,
  public: isPublic,
}: {
  voteOptions: VoteOption[];
  pollID: string;
  username: string;
  public: boolean;
}) {
  const form = useForm({
    resolver: zodResolver(voteSchema),
    defaultValues: {
      voteOption: "",
    },
  });

  const { execute, isExecuting } = useAction(voteOnPollAction);

  const sortedVoteOptions = voteOptions.sort(
    (a, b) => a.presentationOrder - b.presentationOrder,
  );
  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(async (data) => {
          execute({ ...data, pollID, username, isPublic });
        })}
      >
        <RadioGroupSelect name="voteOption" options={sortedVoteOptions} />
        {form.formState.errors.voteOption && (
          <p className="text-red-600">
            {form.formState.errors?.voteOption?.message?.toString()}
          </p>
        )}
        <CardFooter className="flex justify-between">
          <Button type="submit" isLoading={isExecuting}>
            Vote
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
