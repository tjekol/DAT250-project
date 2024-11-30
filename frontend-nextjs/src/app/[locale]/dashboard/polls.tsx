"use client";

import { getPolls } from "@/services";
import { useQuery } from "@tanstack/react-query";

export function Polls() {
  const { data: polls, isFetching } = useQuery({
    queryKey: ["polls"],
    queryFn: getPolls,
  });
  return (
    <div>
      {/* {polls?.map((poll) => <Poll key={poll.id} {...poll} />)} */}
      Test
    </div>
  );
}
