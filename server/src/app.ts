import express from 'express'
import { invalidBodyHandlerMiddleware } from './middleware'
import { roudeMiddlewares } from './routes'

const apiRouter = express.Router()
apiRouter.use(express.json())

apiRouter.get('/test', async (_req, res) => {
  res.status(200).json({ message: 'test success' })
})

roudeMiddlewares.forEach(({ prefix, router }) => apiRouter.use(prefix, router))
apiRouter.use(invalidBodyHandlerMiddleware)

export const apiRouteMiddleware = apiRouter
