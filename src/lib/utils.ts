import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertCamelCaseToWords(inputString: string): string {
  // Using a regular expression to match camel case
  // Replace each uppercase letter with a space followed by the lowercase version of the letter
  return inputString.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
}
