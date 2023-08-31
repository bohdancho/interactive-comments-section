import { validateObjectIdParam } from '@server/middleware'
import express from 'express'
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '.'

const userRouter = express.Router()

userRouter.post('/', createUser)
userRouter.get('/', getAllUsers)
userRouter.get('/:id', validateObjectIdParam, getUser)
userRouter.put('/:id', validateObjectIdParam, updateUser)
userRouter.delete('/:id', validateObjectIdParam, deleteUser)

export const userRouteMiddleware = userRouter
