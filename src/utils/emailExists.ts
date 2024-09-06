import { prisma } from '../config/database'

export const emailExists = async (email: string): Promise<boolean> => {
  const isExists = await prisma.user.findUnique({ where: { email } })
  return !!isExists
}
