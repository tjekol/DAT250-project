"use server";
import { createPoll } from "@/services";
import { actionClient } from "@/utils/action-client";
import { createPollSchema } from "./create-poll-schema";

export const createPollAction = actionClient
  .schema(createPollSchema)
  .action(async ({ parsedInput }) => {
    const body = {
      question: parsedInput.question,
      validUntil: new Date().toISOString(),
      isPublic: parsedInput.isPublic,
      voteOptions: parsedInput.options.map((option, index) => ({
        caption: option.option,
        presentationOrder: index,
      })),
    };

    await createPoll(body);
  });
