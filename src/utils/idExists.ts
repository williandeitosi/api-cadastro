import { prisma } from '../config/database'

export const idExists = async (id: number): Promise<boolean> => {
  const isExists = await prisma.user.findUnique({ where: { id } })
  return !isExists
}
