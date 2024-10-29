import { NextPageProps } from "@/interfaces/navigation";
import { CreateAccountForm } from "./sign-in.form";

export default async function Page(props: NextPageProps) {
  const params = await props.params;

  return (
    <>
      <CreateAccountForm />
    </>
  );
}
