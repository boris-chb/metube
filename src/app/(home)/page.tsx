import Categories from "@/components/home/categories";
import { HydrateClient } from "@/trpc/server";

export const dynamic = "force-dynamic";

interface HomePageProps {
  searchParams: Promise<{
    categoryId?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { categoryId } = await searchParams;

  return (
    <HydrateClient>
      <div className="max-w-[2400px] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
        <Categories categoryId={categoryId} />
        {/* <HomeFeed categoryId={categoryId} /> */}
      </div>
    </HydrateClient>
  );
}
