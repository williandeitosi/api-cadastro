import express from 'express'
import { userRoutes } from './routes/user.routes'

const app = express()

app.use(express.json())
app.use(userRoutes)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running... port: ${PORT}`)
})
