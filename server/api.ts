import express from 'express'

const router = express.Router()

router.get('/test', async (_req, res) => {
  res.status(200).json({ message: 'test success' })
})

export default router
