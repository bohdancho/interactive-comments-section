import express from 'express'

const apiRouter = express.Router()

apiRouter.get('/test', async (_req, res) => {
  res.status(200).json({ message: 'test success' })
})

export const apiRouteMiddleware = apiRouter
