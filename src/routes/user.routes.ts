import { Router } from 'express'
import { createUser, getAll, updateUser } from '../controllers/user.controller'

const router = Router()

router.get('/users', getAll)
router.post('/users', createUser)
router.put('/users/:id', updateUser)

export { router as userRoutes }
