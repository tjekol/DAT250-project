"use server";
import { castVote } from "@/services";
import { actionClient } from "@/utils/action-client";
import { voteActionSchema } from "./vote.schema";

export const voteOnPoll = actionClient
  .schema(voteActionSchema)
  .action(async ({ parsedInput }) => {
    const result = await castVote(
      parsedInput.pollID,
      parsedInput.voteOption,
      parsedInput.username,
    );
    console.log("result", result);
  });
