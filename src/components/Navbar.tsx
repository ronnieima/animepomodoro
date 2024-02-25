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
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

export default function Navbar() {
  const session = useSession();
  const path = usePathname();

  return (
    <nav className=" fixed top-0 z-50 flex w-full items-center justify-between gap-16 bg-neutral-950/50 px-4 py-2 sm:px-16">
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
