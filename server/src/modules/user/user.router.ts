import express from 'express'
import { UserModel, deleteUser, getUser } from '.'

const userRouter = express.Router()

userRouter.get('/', async (req, res) => {
  res.send(await UserModel.find())
})
userRouter.get('/:id', getUser)
userRouter.delete('/:id', deleteUser)

export const userRouteMiddleware = userRouter
