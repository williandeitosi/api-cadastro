import { prisma } from '../config/database'

export const idExists = async (id: number): Promise<boolean> => {
  const isExists = await prisma.user.findUnique({ where: { id } })
  return !!isExists
}

export const postIdExists = async (id: number): Promise<boolean> => {
  const isExists = await prisma.post.findUnique({ where: { id } })
  console.log(!!isExists)
  return !!isExists
}
