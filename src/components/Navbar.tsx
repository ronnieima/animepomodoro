import Link from "next/link";
import React from "react";
import { generateRandomBase64String } from "../lib/utils";
import { buttonVariants } from "./ui/button";

export default async function Navbar() {
  const codeVerification = await generateRandomBase64String(128);
  const malAuthUrl = `https://myanimelist.net/v1/oauth2/authorize?
  response_type=code&
  client_id=${process.env.MAL_CLIENT_ID}&
  code_challenge=${codeVerification.slice(0, 128)}&
  state=RequestID42`;
  return (
    <nav>
      <Link href={malAuthUrl} className={buttonVariants()}>
        Sign in to MAL
      </Link>
    </nav>
  );
}
