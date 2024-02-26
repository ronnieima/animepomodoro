"use client";
import { signOut, useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import SignInButton from "./SignInButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";
import { useBoundStore } from "../lib/zustand/bounded-store";

export default function Navbar() {
  const session = useSession();
  const path = usePathname();
  const timerMode = useBoundStore((store) => store.timerMode);

  return (
    <nav
      className={cn(
        `top-0 z-50 flex w-full items-center justify-between gap-16 bg-transparent px-4 py-2 transition-all duration-1000 sm:px-16`,
        {
          "bg-[#ba4949]/50  ": timerMode === "pomodoro",
          "bg-[#38858a]/50 ": timerMode === "animeBreak",
          "bg-green-900/50 ": timerMode === "longBreak",
        },
      )}
    >
      <Link href="/" className="hover:underline">
        animepomodoro.
      </Link>

      {session.status === "authenticated" ? (
        <>
          <div className="flex items-center gap-8">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Image
                  src={
                    session?.data.user?.image
                      ? session.data.user.image
                      : "/no-image.png"
                  }
                  height={100}
                  width={100}
                  className=" h-12 w-12 rounded-full"
                  alt="MAL profile picture"
                  style={{ objectFit: "cover" }}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {session?.data.user?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="hover:cursor-pointer"
                  onClick={() => signOut()}
                >
                  Sign out
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  disabled={path === "/sessions"}
                  className={cn({
                    "bg-slate-100/20 font-bold ": path === "/sessions",
                  })}
                >
                  <Link href={`/sessions`}>View my sessions</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      ) : (
        <SignInButton size={"sm"} />
      )}
    </nav>
  );
}
