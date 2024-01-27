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
    <nav className=" sticky top-0 z-50 flex items-center justify-between gap-16 bg-transparent px-16 py-2">
      <Link href="/" className="hover:underline">
        animepomodoro.
      </Link>
      {/* <div className="relative h-12 w-12">
        <Image src={"/animedoro.jpg"} alt="logo" fill className="absolute" />
      </div> */}
      {session ? (
        <>
          <div className="flex items-center gap-8">
            {session.user?.image && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Image
                    src={session?.user?.image}
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
            )}
          </div>
        </>
      ) : (
        <Button onClick={() => signIn()}>Sign In</Button>
      )}
    </nav>
  );
}
