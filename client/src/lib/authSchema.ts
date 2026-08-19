import { z } from "zod";

export const signupSchema = z.object({
    name: z.string().min(4, "Name should be atleast of 4 characters"),
    username: z.string().min(3, "Username should be atleast 3 characters").max(12,"Username shouldn't be more than 12 characters").optional(),
  email: z.email(),
  password: z
    .string()
    .min(5, "Password should be atleast 5 characters")
    .max(12, "password shouldn't be more than 12 characters"),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(5, "Password should be atleast 5 characters")
    .max(12, "password shouldn't be more than 12 characters"),
});

export type SignupValidation = z.infer<typeof signupSchema>;
export type LoginValidation = z.infer<typeof loginSchema>;