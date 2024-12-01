import { Poll } from "../interfaces";
import { api } from "./api";

export async function getPolls() {
  try {
    const response = await api.get<Poll[]>("/polls").then((res) => res.data);
    return response;
  } catch (error) {
    console.error("Failed to get polls:", error);
    throw error;
  }
}
export async function getPoll(id: string) {
  try {
    const response = await api
      .get<Poll>(`/polls/${id}`)
      .then((res) => res.data);
    return response;
  } catch (error) {
    console.error("Failed to get poll:", error);
    throw error;
  }
}
