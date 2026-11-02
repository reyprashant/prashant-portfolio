/**
 * Merges class names and resolves Tailwind conflicts.
 * Usage: cn("px-4", condition && "px-6") results in "px-6".
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
