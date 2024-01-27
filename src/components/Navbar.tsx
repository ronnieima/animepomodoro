"use client";
import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "./ui/button";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <nav className="relative flex items-center justify-between gap-16 px-16 py-4">
      <div className="relative h-12 w-12">
        <Image src={"/animedoro.jpg"} alt="logo" fill className="absolute" />
      </div>
      {session ? (
        <>
          <div className="flex items-center gap-8">
            <p>Hello, {session?.user?.name ?? "Unknown"}</p>
            {session.user?.image && (
              <div className="relative ">
                <Image
                  src={session?.user?.image}
                  width={200}
                  height={200}
                  className="h-16 w-16 rounded-full"
                  alt="MAL profile picture"
                />
              </div>
            )}
            <Button onClick={() => signOut()}>Sign out</Button>
          </div>
        </>
      ) : (
        <Button onClick={() => signIn()}>Sign In</Button>
      )}
    </nav>
  );
}
