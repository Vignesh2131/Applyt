import { z } from 'zod'

export const signupSchema = z.object({
  name: z.string().min(4, "Name should be atleast of 4 characters"),
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


export const userSchema = z.object({
    id: z.uuid(),
    name: z.string().min(4, "Name should be atleast of 4 characters"),
    username: z.string().max(15, "username should be less than 15 characters").min(3, 'username should be atleast 3 characters').optional(),
    email: z.email(),
    password: z.string().min(5, "Password should be atleast 5 characters").max(12, "password shouldn't be more than 12 characters"),
})

export const applicationSchema = z.object({
    id: z.uuid(),
    userId: z.string(),
    jobTitle: z.string(),
    salary: z.int().positive().optional(),
    companyName: z.string(),
    source: z.string().optional(),
    notes: z.string().optional(),
    appliedDate: z.string().datetime(),
})
export type SignupValidation = z.infer<typeof signupSchema>
export type LoginValidation = z.infer<typeof loginSchema>
export type UserValidation = z.infer<typeof userSchema>
export type applicationValidation = z.infer<typeof applicationSchema>