import { Router } from 'express'
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

export { router as userRoutes }
