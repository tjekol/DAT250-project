import { Slot } from "@/components/slot";

export default function Page() {
  return (
    <div>
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
