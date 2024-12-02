import { Poll } from "../interfaces";
import { apiClientSide } from "./api";

export async function getPollsClientSide() {
  try {
    const response = await apiClientSide
      .get<Poll[]>("/polls")
      .then((res) => res.data);
    return response;
  } catch (error) {
    console.error("Failed to get polls:", error);
    throw error;
  }
}
