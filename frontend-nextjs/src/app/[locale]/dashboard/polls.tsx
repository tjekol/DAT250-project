"use client";

import { getUsers } from "@/services";
import { useQuery } from "@tanstack/react-query";

export function Polls() {
  const { data: userData, isFetching } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  console.log("isFetching", isFetching);
  console.log("users", userData?.[0]?.username);
  return <div>polls {userData?.[0]?.username}</div>;
}
