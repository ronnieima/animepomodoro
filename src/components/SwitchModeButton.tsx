"use client";
import { ListChecks, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

export default function SwitchModeButton() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const mode = searchParams.get("mode");
  return (
    <Button
      onClick={() => {
        const params = new URLSearchParams(searchParams);
        params.set(
          "mode",
          mode === "search" || mode === null ? "userlist" : "search",
        );
        router.replace(`/?${params.toString()}`, { scroll: false });
      }}
      variant={"outline"}
      className="flex flex-col  md:flex-row"
    >
      <div className="flex items-center gap-2">
        {mode !== "search" ? (
          <>
            <Search />
            <span>Search anime</span>
          </>
        ) : (
          <>
            <ListChecks />
            <span>View my anime list</span>
          </>
        )}
      </div>
    </Button>
  );
}
