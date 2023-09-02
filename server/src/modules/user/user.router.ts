import { Controller, Repository } from '@server/common'
import { ObjectIdSchema, validateAdminOnly, validateParams, validatePayload } from '@server/middleware'
import express from 'express'
import { UserModel } from './user.model'
import { UserService } from './user.service'
import { CreateUserDto, UpdateUserDto, UserDocument } from './user.types'
import { CreateUserSchema, UpdateUserSchema } from './user.validation'

const userRepository = new Repository<UserDocument, CreateUserDto, UpdateUserDto>(UserModel)
const userService = new UserService(userRepository)
const userController = new Controller<UserDocument, CreateUserDto, UpdateUserDto>(userService)

const userRouter = express.Router()

userRouter.get('/', userController.getAll.bind(userController))
userRouter.get('/:id', validateParams(ObjectIdSchema), userController.getOne.bind(userController))

userRouter.post('/', validateAdminOnly, validatePayload(CreateUserSchema), userController.create.bind(userController))
userRouter.put(
  '/:id',
  validateAdminOnly,
  validateParams(ObjectIdSchema),
  validatePayload(UpdateUserSchema),
  userController.update.bind(userController),
)
userRouter.delete('/:id', validateAdminOnly, validateParams(ObjectIdSchema), userController.delete.bind(userController))

export const userRouteMiddleware = userRouter
