import { NextPageProps } from "@/interfaces/navigation";

export default async function Home(props: NextPageProps) {
  const params = await props.params;
  return <div>sui my boi</div>;
}