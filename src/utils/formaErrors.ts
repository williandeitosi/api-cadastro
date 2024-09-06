import { ZodError } from 'zod'

export const formattedZodErrors = (err: ZodError) => {
  return err.errors.map((error) => ({
    field: error.path.join('.'),
    message: error.message,
  }))
}
