import express from 'express'
import path from 'path'
import api from './api/api'

const port = process.env.PORT || 3000

const app = express()

app.use('/api', api)

app.use(express.static('dist/app'))
app.get('*', (_req, res) => {
  res.sendFile(path.join(path.resolve(), 'app/index.html'))
})

app.listen(port, () => {
  console.log('Server listening on port', port)
})
