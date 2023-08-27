import { config } from 'dotenv'
import express from 'express'

config()
console.log(process.env.DB_SERVER)

const router = express.Router()

router.get('/test', async (_req, res) => {
  res.status(200).json({ message: 'test success1' })
})

export default router
