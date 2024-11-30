import { z } from "zod";

export const voteSchema = z.object({
  voteOption: z.string().min(1),
});
export const voteActionSchema = z.object({
  voteOption: z.string().min(1),
  pollID: z.string().min(1),
  username: z.string().min(1),
});
