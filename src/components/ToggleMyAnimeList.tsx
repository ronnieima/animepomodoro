"use client";

import { redirect, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

export default function ToggleMyAnimeList() {
  const searchParams = useSearchParams();
  console.log(searchParams.get("search"));
  const router = useRouter();
  return (
    <Button onClick={() => router.push(`/?mal=true`)}>View MyAnimeList</Button>
  );
}
