import type { Request, Response } from 'express'
import { ZodError } from 'zod'
import { prisma } from '../config/database'
import { emailExists } from '../utils/emailExists'
import { formattedZodErrors } from '../utils/formaErrors'
import { idExists } from '../utils/idExists'
import {
  validateUpdate,
  validateUser,
  type UpdateInput,
  type UserInput,
} from '../validators/modelValidators'

export const getAll = async (req: Request, res: Response) => {
  const allUsers = await prisma.user.findMany({
    orderBy: { id: 'asc' },
  })

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
    newUser.password = 'undefined'
    res
      .status(201)
      .json({ message: 'user created successfully', user: newUser })
  } catch (err) {
    if (err instanceof ZodError) {
      const formattedErrors = formattedZodErrors(err)
      res.status(400).json({ errors: formattedErrors })
    } else {
      console.error('Error when creating user:', err)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: 'Invalid user ID' })
    }

    let updateData: UpdateInput
    try {
      updateData = validateUpdate(req.body)
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = formattedZodErrors(error)
        return res.status(400).json({
          message: 'Validation error',
          errors: formattedErrors,
        })
      }
      throw error
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No valid update data provided' })
    }

    if (!(await idExists(id))) {
      return res.status(404).json({ message: 'User not found' })
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        name: true,
        email: true,
        age: true,
      },
    })

    res
      .status(200)
      .json({ message: 'User updated successfully', update: updatedUser })
  } catch (err) {
    console.error('Errors when updating user:', err)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: 'Invalid user ID' })
    }

    if (!(await idExists(id))) {
      return res.status(404).json({ message: 'User not found' })
    }

    await prisma.user.delete({ where: { id } })

    res.status(200).json({ message: 'Deleted user successfully' })
  } catch (err) {
    console.log(err)
  }
}
