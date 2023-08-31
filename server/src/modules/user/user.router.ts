import express from 'express'
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '.'

const userRouter = express.Router()

userRouter.post('/', createUser)
userRouter.get('/', getAllUsers)
userRouter.get('/:id', getUser)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteUser)

export const userRouteMiddleware = userRouter
