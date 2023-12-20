import { Button } from "@/components/ui/button";
import Link from "next/link";
import getPkce from "oauth-pkce";
import { useEffect, useState } from "react";

function AnimeButton() {
  const [verifier, setVerifier] = useState("");
  useEffect(() => {
    getPkce(128, (error, { verifier }) => {
      setVerifier(verifier);
    });
  }, []);

  const url = `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_MAL_CLIENT_ID}&code_challenge=${verifier}`;
  return (
    <Button asChild>
      <Link href={url} target="_blank">
        Get Anime
      </Link>
    </Button>
  );
}

export default AnimeButton;
