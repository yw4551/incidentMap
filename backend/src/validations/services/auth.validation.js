import { z } from "zod";

export const registerSchema = z.object({
    email: z.email("Invalid email").trim().toLowerCase(),
    password: z.string().min(8, "Password must contain at least 8 characters"),
});

export const loginSchema = z.object({
    email: z.email("Invalid email").trim().toLowerCase(),
    password: z.string().min(8, "Password must contain at least 8 characters"),
});
