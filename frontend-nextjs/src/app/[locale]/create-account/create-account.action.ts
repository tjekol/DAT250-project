"use server";
import { createUser } from "@/services";
import { actionClient } from "@/utils/action-client";

export const createAccountAction = actionClient.action(async () => {
  await createUser();
});
