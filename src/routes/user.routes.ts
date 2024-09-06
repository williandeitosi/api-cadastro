import { Router } from 'express'
import { createUser, getAll } from '../controllers/user.controller'

const router = Router()

router.get('/users', getAll)
router.post('/users', createUser)

export { router as userRoutes }
