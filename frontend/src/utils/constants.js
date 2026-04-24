export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://localhost:9000";
export const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
};