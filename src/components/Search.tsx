"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import useDebounce from "../hooks/useDebounce";
import { useRouter } from "next/navigation";

export default function Search({ searchQuery }: { searchQuery?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(searchQuery || "");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery) router.push("/");
    else router.push(`/?search=${debouncedQuery}`, { scroll: false });
  }, [router, debouncedQuery]);

  return (
    <Input
      type="text"
      placeholder="Search anime"
      onChange={(e) => setQuery(e.target.value)}
      value={query}
    />
  );
}
