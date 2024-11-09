import { Navbar } from "@/components/navbar";
import { Params } from "@/interfaces/navigation";

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<Params>;
}) {
  const params = await props.params;
  const { locale } = params;
  const { children } = props;

  return (
    <>
      <Navbar locale={locale} />
      {children}
    </>
  );
}
