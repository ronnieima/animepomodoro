import db from "@/src/db";
import { accounts } from "@/src/db/schema/users";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import { NextAuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
export const generateRandomBase64String = (length = 24) =>
  Buffer.from(crypto.getRandomValues(new Uint8Array(length))).toString(
    "base64url",
  );
const code_challenge = generateRandomBase64String(96);
const code_verifier = code_challenge;

const malClientId = process.env.MAL_CLIENT_ID!;
const malSecret = process.env.MAL_SECRET!;
const callbackUrl = process.env.CALLBACK_URL!;

// MAL API Ref: https://myanimelist.net/apiconfig/references/api/v2

export const options: NextAuthOptions = {
  session: { strategy: "database" },
  callbacks: {
    async session({ session, user }) {
      const data = await db
        .select({ accessToken: accounts.access_token })
        .from(accounts)
        .where(eq(accounts.userId, user.id));
      const accessToken = data[0].accessToken;

      // Send properties to the client, like an access_token and user id from a provider.
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          name: user.name,
          accessToken: accessToken,
        },
      };
    },
  },
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    {
      id: "mal",
      name: "MyAnimeList",
      type: "oauth",
      clientId: malClientId,
      clientSecret: malSecret,
      authorization: {
        url: `https://myanimelist.net/v1/oauth2/authorize`,
        params: {
          code_challenge: code_challenge,
        },
      },
      token: {
        async request(context) {
          const { code } = context.params;
          const res = await fetch("https://myanimelist.net/v1/oauth2/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: malClientId,
              client_secret: malSecret,
              code: code!,
              code_verifier: code_verifier,
              grant_type: "authorization_code",
              redirect_uri: callbackUrl,
            }),
          });
          const tokens = await res.json();
          return { tokens };
        },
      },
      userinfo: "https://api.myanimelist.net/v2/users/@me",
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          image: profile.picture,
        };
      },
    },
  ],
};
