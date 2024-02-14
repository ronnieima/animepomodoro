import { generateRandomBase64String } from "@/src/app/actions";
import { NextAuthOptions } from "next-auth";

const code_challenge = generateRandomBase64String(96);
const code_verifier = code_challenge;

const malClientId = process.env.MAL_CLIENT_ID!;
const malSecret = process.env.MAL_SECRET!;
const callbackUrl = process.env.CALLBACK_URL!;

console.log(process.env.NODE_ENV);

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
          console.log(tokens);
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
