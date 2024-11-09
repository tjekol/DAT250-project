import { NextPageProps } from "@/interfaces/navigation";
import SignUp from "./sign-up";

export default async function Page(props: NextPageProps) {
  const params = await props.params;
  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <SignUp locale={params.locale} />
    </div>
  );
}
