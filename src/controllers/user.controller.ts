import type { Request, Response } from 'express'
import { ZodError } from 'zod'
import { prisma } from '../config/database'
import { emailExists } from '../utils/emailExists'
import { formattedZodErrors } from '../utils/formaErrors'
import { validateUser, type UserInput } from '../validators/modelValidators'

export const getAll = async (req: Request, res: Response) => {
  const allUsers = await prisma.user.findMany()

  if (!allUsers) {
    return res.status(404).json({ message: 'Users not found' })
  } else {
    return res.status(200).json({ message: 'All users', allUsers })
  }
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const { age, email, name, password }: UserInput = validateUser(req.body)

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and Password is required' })
    }

    if (password.length < 3) {
      return res
        .status(400)
        .json({ message: 'Password need have min 3 characters' })
    }

    if (await emailExists(email)) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    const newUser = await prisma.user.create({
      data: { email, name, age, password },
    })

    res
      .status(201)
      .json({ message: 'user created successfully', user: newUser })
  } catch (err) {
    if (err instanceof ZodError) {
      const formattedErrors = formattedZodErrors(err)
      res.status(400).json({ errors: formattedErrors })
    } else {
      console.error('Erro ao criar usuário:', err)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
}
