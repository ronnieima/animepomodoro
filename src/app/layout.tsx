import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "../components/Providers";
import "./globals.css";
import Navbar from "../components/Navbar";
import { getServerSession } from "next-auth";
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
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers session={session!}>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
