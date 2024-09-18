import type { Request, Response } from 'express'
import { ZodError } from 'zod'
import { prisma } from '../config/database'
import { formattedZodErrors } from '../utils/formaErrors'
import { idExists, postIdExists } from '../utils/idExists'
import { validatePost, validatePostUpdate } from '../validators/modelValidators'

export const createUserPost = async (req: Request, res: Response) => {
  try {
    const { content, published, title } = validatePost(req.body)
    const userId = Number(req.params.id)
    console.log(userId)

    if (!(await idExists(userId))) {
      return res.status(404).json({ message: 'User not found' })
    }
    await prisma.post.create({
      data: {
        content,
        title,
        published,
        authorId: userId,
      },
    })

    res.status(201).json({ message: 'Created post successfully' })
  } catch (err) {
    if (err instanceof ZodError) {
      const formattedErrors = formattedZodErrors(err)
      res.status(400).json({ errors: formattedErrors })
    } else {
      console.error('Error when creating post:', err)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
}

export const listUserPost = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)

    if (!(await idExists(id))) {
      return res.status(404).json({ message: 'User not found' })
    }
    const userPost = await prisma.user.findUnique({
      where: { id },

      select: {
        id: true,
        name: true,
        age: true,
        posts: {
          orderBy: { id: 'asc' },
          select: {
            id: true,
            title: true,
            content: true,
            published: true,
          },
        },
      },
    })
    res.status(200).json({ userPost })
  } catch (err) {
    if (err instanceof ZodError) {
      const formattedErrors = formattedZodErrors(err)
      res.status(400).json({ errors: formattedErrors })
    } else {
      console.error('Error when list posts:', err)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
}

export const deleteUserPost = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.postId)

    if (!(await postIdExists(id))) {
      return res.status(404).json({ message: 'Post not found' })
    }

    await prisma.post.delete({
      where: { id },
    })

    res.status(200).json({ message: 'Deleted post successfully' })
  } catch (err) {
    if (err instanceof ZodError) {
      const formattedErrors = formattedZodErrors(err)
      res.status(400).json({ errors: formattedErrors })
    } else {
      console.error('Error when deleting post:', err)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
}

export const updateUserPost = async (req: Request, res: Response) => {
  const updateData = validatePostUpdate(req.body)
  const id = Number(req.params.postId)

  if (!(await postIdExists(id))) {
    return res.status(404).json({ message: 'Post not found' })
  }

  console.log(id)

  const updatePost = await prisma.post.update({
    where: { id },
    data: updateData,
  })

  res
    .status(200)
    .json({ message: 'Updated post successfully', data: updatePost })
}
