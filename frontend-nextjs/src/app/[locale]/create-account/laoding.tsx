import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <Loader size={100} className="animate-spin" />
    </div>
  );
}
