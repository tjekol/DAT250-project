import { z } from "zod";

const optionSchema = z.object({
  option: z.string().min(1),
});
export const createPollSchema = z.object({
  question: z.string().min(3),
  voteOptions: z.array(optionSchema).min(1),
  isPublic: z.boolean(),
  validUntil: z.date(),
});

const voteOptionsDefaultValues = [{ option: "" }, { option: "" }];
export const createPollDefaultValues = {
  question: "",
  voteOptions: voteOptionsDefaultValues,
  isPublic: false,
  validUntil: new Date(),
};
