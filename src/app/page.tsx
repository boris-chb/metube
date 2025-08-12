import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/trpc/server";
import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  const { greeting } = await trpc.hello({ text: "World" });

  return (
    <div className="w-full h-screen bg-amber-100">
      <UserButton
        fallback={<Skeleton className="h-7 w-7 border rounded-full" />}
      />

      {greeting}
    </div>
  );
}
