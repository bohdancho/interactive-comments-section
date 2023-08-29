import express from 'express'
import { roudeMiddlewares } from './routes'

const apiRouter = express.Router()

apiRouter.get('/test', async (_req, res) => {
  res.status(200).json({ message: 'test success' })
})

roudeMiddlewares.forEach(({ prefix, router }) => apiRouter.use(prefix, router))

export const apiRouteMiddleware = apiRouter
