import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const strongPasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(32, "Password must be less than 32 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character",
  );

/**
 *
 * @returns a random rfc4122 version 4 UUID
 */
export function generateUUID(): string {
  return crypto.randomUUID();
}

/**
 * Slugify a string by lowercasing it, removing non-alphanumeric characters,
 * replacing spaces with dashes, and collapsing multiple dashes.
 *
 * @param {string} text - The string to slugify.
 * @returns {string} The slugified string.
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove non-alphanumerics
    .replace(/\s+/g, "-") // replace spaces with dashes
    .replace(/-+/g, "-"); // collapse multiple dashes
};

/**
 * Determines if the given item URL is an active route based on the current path.
 *
 * @param {string} currentPath - The current URL path.
 * @param {string} itemUrl - The URL path of the navigation item.
 * @returns {boolean} True if the current path matches or starts with the item URL and is followed by a slash, indicating an active route.
 */
export const isActiveRoute = (
  currentPath: string,
  itemUrl: string,
): boolean => {
  if (currentPath === itemUrl) return true;

  // Handle nested routes - check if current path starts with item URL
  // but avoid matching partial segments (e.g., /internships shouldn't match /internships-other)
  return (
    currentPath.startsWith(itemUrl) &&
    currentPath.charAt(itemUrl.length) === "/"
  );
};
