"use server";
import { castVote } from "@/services";
import { actionClient } from "@/utils/action-client";
import { voteActionSchema } from "./vote.schema";

export const voteOnPollAction = actionClient
  .schema(voteActionSchema)
  .action(async ({ parsedInput }) => {
    await castVote(
      parsedInput.pollID,
      parsedInput.voteOption,
      parsedInput.isPublic,
    );
  });
