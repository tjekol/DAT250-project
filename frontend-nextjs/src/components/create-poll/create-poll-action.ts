"use server";
import { createPoll } from "@/services";
import { actionClient } from "@/utils/action-client";
import { z } from "zod";
import { createPollSchema } from "./create-poll-schema";

const createPollActionSchema = {
  question: z.string().min(3),
  voteOptions: z.array(z.object({ option: z.string().min(1) })).min(1),
  isPublic: z.boolean(),
};
export const createPollAction = actionClient
  .schema(createPollSchema)
  .action(async ({ parsedInput }) => {
    const body = {
      question: parsedInput.question,
      validUntil: new Date().toISOString(),
      public: parsedInput.isPublic,
      voteOptions: parsedInput.voteOptions.map((option, index) => ({
        caption: option.option,
        presentationOrder: index,
      })),
    };

    return createPoll(body);
  });
