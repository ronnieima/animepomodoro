import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "../components/Providers";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anime Pomodoro Timer",
  description: "Use AnimeDoro to optimize your studies!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}  `}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
