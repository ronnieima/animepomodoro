import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function generateRandomBase64Stringz(length = 24) {
  // Create a Uint8Array of 'length' random bytes
  const randomBytes = new Uint8Array(length);
  crypto.getRandomValues(randomBytes);

  // Convert the random bytes to a string
  let binaryString = "";
  randomBytes.forEach((byte) => {
    binaryString += String.fromCharCode(byte);
  });

  // Convert the binary string to a Base64 string
  const base64String = btoa(binaryString);
  console.log(base64String.length);
  return base64String;
}
