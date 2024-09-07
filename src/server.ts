import express, { Request, Response } from 'express'
import { userRoutes } from './routes/user.routes'

const app = express()

app.use(express.json())
app.use(userRoutes)

app.use('*', (req: Request, res: Response) => {
  const err = Error(`Requested path ${req.path} not found`)
  res.status(404).send({
    success: false,
    message: `Requested path ${req.path} not found`,
    stack: err.stack,
  })
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running... port: ${PORT}`)
})
