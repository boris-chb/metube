import { trpc } from "@/trpc/server";

export default async function Home() {
  const { greeting } = await trpc.hello({ text: "World" });

  return <>{greeting}</>;
}
