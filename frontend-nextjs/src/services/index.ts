import { auth, currentUser } from "@clerk/nextjs/server";
import "server-only";
import { CreatePoll, Poll, User } from "../interfaces";
import { api } from "./api";

export async function getToken() {
  const session = await auth();
  const token = await session.getToken();
  return token;
}

export async function createPoll(body: CreatePoll) {
  const token = await getToken();
  const user = await currentUser();
  const username = user?.username;
  if (!username) {
    throw new Error("User not found ");
  }
  try {
    const response = await api.post<Poll>("/polls", {
      username,
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

export async function castVote(
  pollID: string,
  voteOption: string,
  isPublic: boolean,
) {
  if (isPublic) {
    try {
      const response = await api.post<any>(`/votes`, {
        pollID,
        voteOption,
        username: null,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to cast vote:", error);
      throw error;
    }
  }
  const token = await getToken();
  const user = await currentUser();
  const username = user?.username;
  if (!username) {
    throw new Error("User not found ");
  }
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

// Temp solution to handle user creation
export async function createUser() {
  let user = await currentUser();
  let maxRetries = 5;
  while (!user?.username && maxRetries > 0) {
    user = await currentUser();
    maxRetries--;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  const username = user?.username;
  const email = user?.emailAddresses?.[0]?.emailAddress || "dummy@email.com";
  if (!username) {
    return null;
  }
  try {
    const response = await api.post<User>("/users", {
      username,
      email,
      password: "password",
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create user:", error);
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

export async function getPolls() {
  try {
    const response = await api.get<Poll[]>("/polls").then((res) => res.data);
    return response;
  } catch (error) {
    console.error("Failed to get polls:", error);
    throw error;
  }
}
