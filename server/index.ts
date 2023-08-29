import { config } from 'dotenv'
import express from 'express'
import mongoose, { Mongoose } from 'mongoose'
import path from 'path'
import { apiRouteMiddleware } from './src/app'

config()
const { DB_URL, PORT } = process.env as { DB_URL: string; PORT: string }

try {
  await (<Promise<Mongoose>>mongoose.connect(DB_URL))

  console.log(`Creating connection to the MongoDB database`)
  console.log('Successfully connected to MongoDB')
} catch (err) {
  console.log(`Could not connect to MongoDB because ${err}`)

  await mongoose.disconnect()
  throw err
}

const app = express()
app.use('/api', apiRouteMiddleware)

app.use(express.static('dist/app'))
app.get('*', (_req, res) => {
  res.sendFile(path.join(path.resolve(), 'app/index.html'))
})

app.listen(PORT, () => {
  console.log('Server listening on port', PORT)
})
