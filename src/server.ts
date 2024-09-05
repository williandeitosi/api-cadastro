import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Hello world' })
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running... port: ${PORT}`)
})
