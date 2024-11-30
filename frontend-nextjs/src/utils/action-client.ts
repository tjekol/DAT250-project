import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
  async handleServerError(e) {
    console.error("Action error:", e.message);
  },
});
