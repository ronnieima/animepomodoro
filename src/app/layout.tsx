import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Providers from "../components/Providers";
import "./globals.css";
import { options } from "./api/auth/[...nextauth]/options";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anime Pomodoro Timer",
  description: "Use AnimeDoro to optimize your studies!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://umami-fork-murex.vercel.app/script.js"
          data-website-id="5748311c-de0f-4008-8da7-137acea80104"
        />
      </head>
      <body className={`${inter.className}`}>
        <Providers session={session!}>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
