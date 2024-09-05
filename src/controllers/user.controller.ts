import type { Request, Response } from 'express'
import { prisma } from '../config/database'

export const getAll = async (req: Request, res: Response) => {
  const allUsers = await prisma.user.findMany()

  if (!allUsers) {
    return res.status(404).json({ message: 'Users not found' })
  } else {
    return res.status(200).json({ message: 'All users', allUsers })
  }
}
