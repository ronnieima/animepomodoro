import { NextRequest, NextResponse } from "next/server";

interface TokenRequest {
  code: string;
  codeChallenge: string;
}

export async function GET(req: NextRequest) {
  const url = `https://myanimelist.net/v1/oauth2/authorize`;

  const res = await fetch(url);
  const data = await res.json();
  console.log(data);

  return Response.json(res);
}
