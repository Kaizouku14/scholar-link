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

/**
 * Check if deadline is within 7 days
 * @returns {boolean} Whether deadline is approaching
 */
export const isDeadlineApproaching = (deadline: Date) => {
  const today = new Date();
  const timeDiff = deadline.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysDiff <= 7 && daysDiff > 0;
};

/**
 * Check if deadline has passed
 * @param {Date} deadline - The deadline to check against
 * @returns {boolean} Whether deadline has passed
 */
export const isDeadlinePassed = (deadline: Date) => {
  const today = new Date();
  return deadline < today;
};

/**
 * Calculate the number of days left until a given deadline.
 *
 * @param {Date} deadline - The deadline to calculate against.
 * @returns {number} The absolute number of days left until the deadline.
 */
export const calculateDaysLeft = (deadline: Date) => {
  const today = new Date();
  const diffTime = deadline.getTime() - today.getTime();
  return Math.abs(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
};

export const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "outline";
    case "approved":
      return "default";
    case "rejected":
      return "destructive";
    default:
      return "outline";
  }
};

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "approved":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "rejected":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

export const getStatusIndicatorColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-amber-400";
    case "approved":
      return "bg-emerald-400";
    case "rejected":
      return "bg-red-400";
    default:
      return "bg-gray-400";
  }
};

/**
 * Format a string by trimming, normalizing camelCase to spaces, and capitalizing
 * the first letter of each word.
 *
 * @example
 * formatText("helloWorld") // "Hello World"
 * formatText("hello_world") // "Hello World"
 * formatText("hello   world") // "Hello World"
 * formatText("helloWORLD") // "Hello World"
 * @param {string} text
 * @returns {string}
 */
export function formatText(text: string) {
  return text
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1 $2") // split camelCase
    .replace(/_/g, " ") // underscores → spaces
    .replace(/\s+/g, " ") // collapse multiple spaces
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
