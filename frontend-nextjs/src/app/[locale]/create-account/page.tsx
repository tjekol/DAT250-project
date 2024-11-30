import { NextPageProps } from "@/interfaces/navigation";
import { createUser } from "@/services";
import { redirect } from "next/navigation";

export default async function Page(props: NextPageProps) {
  const result = await createUser();
  if (result) {
    redirect("/dashboard");
  }
  redirect("/");
}
