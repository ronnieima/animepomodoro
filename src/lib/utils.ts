import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function generateRandomBase64String(length: number) {
  return Buffer.from(crypto.getRandomValues(new Uint8Array(length))).toString(
    "base64url",
  );
}
