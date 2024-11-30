import { auth } from "@clerk/nextjs/server";
import "server-only";
import { CreatePoll, Poll } from "../interfaces";
import { api } from "./api";

export async function getToken() {
  const session = await auth();
  const token = await session.getToken();
  return token;
}

export async function createPoll(body: CreatePoll) {
  const token = await getToken();
  const userId = "123"; // TODO: temporary solution, should use token
  try {
    const response = await api.post<Poll>("/polls", {
      ...body,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create poll:", error);
    throw error;
  }
}

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

export async function castVote(
  pollID: string,
  voteOption: string,
  username: string,
) {
  const token = await getToken();
  try {
    const response = await api.post<any>(`/votes`, {
      pollID,
      username,
      voteOption,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to cast vote:", error);
    throw error;
  }
}
