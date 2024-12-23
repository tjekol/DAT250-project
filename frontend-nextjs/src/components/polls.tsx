"use client";

import { getPollsClientSide } from "@/services/api-open";
import { useQuery } from "@tanstack/react-query";
import { Poll } from "./poll";

export function Polls() {
  const { data: polls, isFetching } = useQuery({
    queryKey: ["polls"],
    queryFn: getPollsClientSide,
  });

  if (isFetching) {
    return <div>Loading polls</div>;
  }

  return (
    <div className="grid grid-flow-row grid-cols-3 gap-10">
      {polls?.map((poll, index) => <Poll key={index} poll={poll} />)}
    </div>
  );
}
