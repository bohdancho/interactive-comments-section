import { ObjectIdSchema, validateAdminOnly, validateParams, validatePayload } from '@server/middleware'
import express from 'express'
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from './user.controller'
import { CreateUserSchema, UpdateUserSchema } from './user.validation'

const userRouter = express.Router()

userRouter.get('/', getAllUsers)
userRouter.get('/:id', validateParams(ObjectIdSchema), getUser)

userRouter.post('/', validateAdminOnly, validatePayload(CreateUserSchema), createUser)
userRouter.put('/:id', validateAdminOnly, validateParams(ObjectIdSchema), validatePayload(UpdateUserSchema), updateUser)
userRouter.delete('/:id', validateAdminOnly, validateParams(ObjectIdSchema), deleteUser)

export const userRouteMiddleware = userRouter
