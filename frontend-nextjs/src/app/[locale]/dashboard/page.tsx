import { Slot } from "@/components/slot";
import { NextPageProps } from "@/interfaces/navigation";
import { Polls } from "./polls";

export default async function Page(props: NextPageProps) {
  // const users = await getUsers();
  // console.log(users);
  // const queryClient = new QueryClient();

  // const users = await queryClient.prefetchQuery({
  //   queryKey: ["users"],
  //   queryFn: getUsers,
  // });

  // console.log(users);
  return (
    <div>
      <Polls />
      <div className="flex justify-between">
        <h1>Header</h1>
        <h1>Header2</h1>
      </div>
      <Slot>
        <Slot.Header></Slot.Header>
        <Slot.Sidebar>
          <h1>Sidebar</h1>
        </Slot.Sidebar>
        <Slot.Content>
          <h1>Content</h1>
        </Slot.Content>
        <Slot.Footer>
          <h1>Footer</h1>
        </Slot.Footer>
      </Slot>
    </div>
  );
}
