import express from 'express'
import mongoose from 'mongoose'
import { userService } from './user.service'

const userRouter = express.Router()

// TODO remove after demo
userRouter.get('/:id', async (req, res) => {
  const id = new mongoose.Types.ObjectId(req.params.id)
  console.log(id)
  const user = await userService.findOne(id)

  return res.send(user)
})

export const userRouteMiddleware = userRouter
