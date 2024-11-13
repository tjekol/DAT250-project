import { NextPageProps } from "@/interfaces/navigation";
import SignIn from "./sign-in";

export default async function Page(props: NextPageProps) {
  const params = await props.params;
  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <SignIn locale={params.locale} />
    </div>
  );
}
