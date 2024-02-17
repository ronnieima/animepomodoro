"use client";
import { signIn, signOut, useSession } from "next-auth/react";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className=" fixed top-0 z-50 flex w-full items-center justify-between gap-16 bg-neutral-950/50 px-16 py-2">
      <Link href="/" className="hover:underline">
        animepomodoro.
      </Link>
      {session?.user ? (
        <>
          <div className="flex items-center gap-8">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Image
                  src={
                    session?.user?.image ? session.user.image : "/no-image.png"
                  }
                  height={100}
                  width={100}
                  className=" h-12 w-12 rounded-full"
                  alt="MAL profile picture"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="hover:cursor-pointer"
                  onClick={() => signOut()}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      ) : (
        <Button onClick={() => signIn()}>Sign In</Button>
      )}
    </nav>
  );
}
