import express from 'express'
import path from 'path'

const port = process.env.PORT || 3000

const app = express()

app.get('/api', (_req, res) => {
  res.json({ message: 'Hello, api!' })
})

app.use(express.static('dist/app'))
app.get('*', (_req, res) => {
  res.sendFile(path.join(path.resolve(), 'app/index.html'))
})

app.listen(port, () => {
  console.log('Server listening on port', port)
})
