import express from 'express'
import { UserModel } from '../modules/user'

const router = express.Router()

router.get('/users', async (_req, res) => {
  res.status(200).json({ users: await UserModel.find() })
})

export default router
