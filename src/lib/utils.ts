import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = async (delay: number) =>
  new Promise((resolve) => setTimeout(() => resolve(""), delay));
