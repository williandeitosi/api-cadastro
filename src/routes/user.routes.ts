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
  loginUser,
  updateUser,
} from '../controllers/user.controller'
import { authenticateJWT } from '../middleware/auth'

const router = Router()

router.post('/users', createUser)
router.post('/login', loginUser)
// TODO: solve this problem authenticateJWT
router.get('/users', authenticateJWT, getAll)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

router.post('/users/:id/newpost', createUserPost)
router.get('/users/:id/posts', listUserPost)
router.put('/users/:id/post/:postId', updateUserPost)
router.delete('/users/:id/post/:postId', deleteUserPost)

export { router as userRoutes }
