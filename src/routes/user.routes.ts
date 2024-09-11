import { Router } from 'express'
import {
  createUserPost,
  deleteUserPost,
  listUserPost,
  updateUserPost,
} from '../controllers/post.controller'
import {
  createUser,
  deleteUser,
  getAll,
  updateUser,
} from '../controllers/user.controller'

const router = Router()

router.get('/users', getAll)
router.post('/users', createUser)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

router.post('/users/:id/newpost', createUserPost)
router.get('/users/:id/posts', listUserPost)
router.put('/users/:id/post/:postId', updateUserPost)
router.delete('/users/:id/post/:postId', deleteUserPost)

export { router as userRoutes }
