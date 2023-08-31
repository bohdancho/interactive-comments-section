import { ObjectIdSchema, validateParams, validatePayload } from '@server/middleware'
import express from 'express'
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from './user.controller'
import { CreateUserSchema, UpdateUserSchema } from './user.validation'

const userRouter = express.Router()

userRouter.post('/', validatePayload(CreateUserSchema), createUser)
userRouter.get('/', getAllUsers)
userRouter.get('/:id', validateParams(ObjectIdSchema), getUser)
userRouter.put('/:id', validateParams(ObjectIdSchema), validatePayload(UpdateUserSchema), updateUser)
userRouter.delete('/:id', validateParams(ObjectIdSchema), deleteUser)

export const userRouteMiddleware = userRouter
