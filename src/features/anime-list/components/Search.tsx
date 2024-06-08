"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/src/components/ui/input";
import useDebounce from "@/src/hooks/useDebounce";

export default function Search({ searchQuery }: { searchQuery?: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const [query, setQuery] = useState(searchQuery || "");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const newParams = new URLSearchParams(params);
    newParams.set("search", debouncedQuery);

    if (!debouncedQuery) router.replace("/", { scroll: false });
    else router.replace(`?${newParams}`, { scroll: false });
  }, [router, debouncedQuery, params]);

  return (
    <Input
      type="text"
      placeholder="Search anime"
      onChange={(e) => setQuery(e.target.value)}
      value={query}
    />
  );
}
