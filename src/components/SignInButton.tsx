"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

export default function SignInButton({
  className,
  size = "default",
}: {
  className?: string;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
}) {
  return (
    <Button
      onClick={() => signIn()}
      size={size}
      className={cn(
        " bg-[#2e51a2] text-neutral-100 hover:bg-[#2e51a2]/50",
        className,
      )}
    >
      Sign in to MAL
    </Button>
  );
}
