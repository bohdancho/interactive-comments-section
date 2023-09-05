import { appRouter } from '@server/app'
import { createContext } from '@server/context'
import * as trpcExpress from '@trpc/server/adapters/express'
import { config } from 'dotenv'
import express from 'express'
import path from 'path'

config()
const { PORT } = process.env as { PORT: string }

const app = express()

app.use('/trpc', trpcExpress.createExpressMiddleware({ router: appRouter, createContext }))

app.use(express.static('dist/app'))
app.get('*', (_req, res) => {
  res.sendFile(path.join(path.resolve(), 'app/index.html'))
})

app.listen(PORT, () => {
  console.log('Server listening on port', PORT)
})
