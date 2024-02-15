"use client";

import { redirect, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

export default function ToggleMyAnimeList() {
  const searchParams = useSearchParams();
  const isMal = searchParams.get("mal");
  const router = useRouter();
  return (
    <Button onClick={() => router.push(`/?mal=${!isMal}&status=watching`)}>
      View MyAnimeList
    </Button>
  );
}
