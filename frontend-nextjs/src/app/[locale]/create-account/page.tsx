import { NextPageProps } from "@/interfaces/navigation";
import CreateAction from "./create-account.form";

export default async function Page(props: NextPageProps) {
  // const result = await createUser();
  // const action = useAction(createAccountAction);
  // action.execute;

  // if (action.hasSucceeded) {
  //   console.log("Account created successfully");
  //   redirect("/dashboard");
  // }
  // redirect("/");
  return <CreateAction />;
}
