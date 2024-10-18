import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = async (delay: number) =>
  new Promise((resolve) => setTimeout(() => resolve(""), delay));

export const getRandomDigits = (length: number) => {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
};
