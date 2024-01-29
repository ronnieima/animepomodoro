import { generateRandomBase64String } from "@/src/lib/utils";
import { NextAuthOptions } from "next-auth";

const code_challenge = async () => await generateRandomBase64String(96);
const code_verifier = code_challenge;

export const options: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          image: user.picture,
          accessToken: account?.access_token,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          image: token.image,
          accessToken: token.accessToken,
        },
      };
    },
  },
  providers: [
    {
      id: "mal",
      name: "MyAnimeList",
      type: "oauth",
      clientId: process.env.MAL_CLIENT_ID,
      clientSecret: process.env.MAL_SECRET,
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
              client_id: "9b02a51e2006b456d96f84782b27f6bc",
              client_secret:
                "abd692a2f2f90f3558f80c4e248f2f2d7173e4ab37ceed74e32bdd907ecbc74d",
              code: code!,
              code_verifier: code_verifier,
              grant_type: "authorization_code",
              redirect_uri: "http://localhost:3000/api/auth/callback/mal",
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
          picture: profile.picture,
        };
      },
    },
  ],
};
