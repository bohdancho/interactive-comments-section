import { appRouter } from '@server/app'
import { createContext } from '@server/context'
import * as trpcExpress from '@trpc/server/adapters/express'
import express from 'express'
import path from 'path'

const app = express()
const PORT = Number(Bun.env.PORT)

app.use('/trpc', trpcExpress.createExpressMiddleware({ router: appRouter, createContext }))

app.use(express.static('dist/app'))
app.get('*', (_req, res) => {
  res.sendFile(path.join(path.resolve(), 'app/index.html'))
})

app.listen(PORT, () => {
  console.log('Server listening on port', PORT)
})
