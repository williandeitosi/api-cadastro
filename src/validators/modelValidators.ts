import { z } from 'zod'

export const createUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  name: z
    .string()
    .min(3, { message: 'Name must have at least 3 characters' })
    .nullable()
    .optional(),
  password: z
    .string()
    .min(3, { message: 'Password must have at least 3 characters' }),
  age: z
    .number()
    .positive()
    .int()
    .min(18, { message: 'Min age is 18 years old' })
    .nullable()
    .optional(),
})
export type UserInput = z.infer<typeof createUserSchema>

export const updateUserSchema = z.object({
  id: z.number().int().positive().optional(),
  email: z.string().email({ message: 'Invalid email' }).optional(),
  name: z
    .string()
    .min(3, { message: 'Name must have at least 3 characters' })
    .nullable()
    .optional(),
  password: z
    .string()
    .min(3, { message: 'Password must have at least 3 characters' })
    .optional(),
  age: z
    .number()
    .positive()
    .int()
    .min(18, { message: 'Min age is 18 years old' })
    .nullable()
    .optional(),
})

export type UpdateInput = z.infer<typeof updateUserSchema>

export const PostSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Password must have at least 3 characters' }),
  content: z.string().nullable(),
  published: z.boolean().default(false),
  authorId: z
    .number()
    .int()
    .positive({ message: 'Author ID must be a positive number' }),
})

export type PostInput = z.infer<typeof PostSchema>

export function validateUser(data: unknown): UserInput {
  return createUserSchema.parse(data)
}

export function validateUpdate(data: unknown): UpdateInput {
  return updateUserSchema.parse(data)
}
export function validatePost(data: unknown): PostInput {
  return PostSchema.parse(data)
}
