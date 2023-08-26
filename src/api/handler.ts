import express from 'express'

const port = process.env.PORT || 3000

const app = express()

app.get('/index', (_req, res) => {
  res.json({ message: 'Hello, index!' })
})

app.listen(port, () => {
  console.log('Server listening on port', port)
})

export const handler = app
