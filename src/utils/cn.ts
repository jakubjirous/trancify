import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Helper function for merging Tailwind classes
 * @param inputs
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
