"use client";
import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "./ui/button";

export default function Navbar() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <nav className="flex items-center gap-16 px-16 py-4">
      {session ? (
        <>
          <p>Hello, {session?.user?.name}</p>
          <Button onClick={() => signOut()}>Sign out</Button>
        </>
      ) : (
        <Button onClick={() => signIn()}>Sign In</Button>
      )}
    </nav>
  );
}
