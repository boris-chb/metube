"use client";

import FilterCarousel from "@/components/filter-carousel";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type CategoriesProps = {
  categoryId?: string;
};

export default function Categories({ categoryId }: CategoriesProps) {
  return (
    <Suspense fallback={<p>Loading categories...</p>}>
      <ErrorBoundary fallback={<p>Error loading categories...</p>}>
        <CategoriesSuspense categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  );
}

function CategoriesSuspense({ categoryId }: CategoriesProps) {
  const router = useRouter();
  // const [categories] = trpc.categories.getMany.useSuspenseQuery();

  const data = [
    { value: "1", label: "Engineering" },
    { value: "2", label: "Science" },
    { value: "3", label: "Literature" },
    { value: "4", label: "Cinema" },
    { value: "5", label: "Comedy" },
  ];

  function onSelect(value: string | null) {
    const url = new URL(window.location.href);

    if (value) {
      url.searchParams.set("categoryId", value);
    } else {
      url.searchParams.delete("categoryId");
    }

    router.push(url.toString());
  }

  return <FilterCarousel onSelect={onSelect} value={categoryId} data={data} />;
}
