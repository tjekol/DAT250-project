import { z } from "zod";

const optionSchema = z.object({
  option: z.string().min(1),
});
export const createPollSchema = z.object({
  question: z.string().min(3),
  options: z.array(optionSchema).min(1),
  isPublic: z.boolean(),
  validUntil: z.date(),
});

const optionsDefaultValues = [{ option: "" }, { option: "" }];
export const createPollDefaultValues = {
  question: "",
  options: optionsDefaultValues,
  isPublic: false,
  validUntil: new Date(),
};
