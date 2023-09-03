import { Controller, ObjectIdParamsSchema, Repository } from '@server/common'
import { validateAdminOnly, validateParams, validatePayload } from '@server/middleware'
import express from 'express'
import { UserModel } from './user.model'
import { UserService } from './user.service'
import { CreateUserDto, UpdateUserDto, UserDocument } from './user.types'
import { CreateUserSchema, UpdateUserSchema } from './user.validation'

const repository = new Repository<UserDocument>(UserModel)
const service = new UserService<UserDocument, CreateUserDto, UpdateUserDto>(repository)
const controller = new Controller<UserDocument, CreateUserDto, UpdateUserDto>(service)

const router = express.Router()

router.get('/', controller.getAll.bind(controller))
router.get('/:id', validateParams(ObjectIdParamsSchema), controller.getOne.bind(controller))

router.post('/', validateAdminOnly, validatePayload(CreateUserSchema), controller.create.bind(controller))
router.put(
  '/:id',
  validateAdminOnly,
  validateParams(ObjectIdParamsSchema),
  validatePayload(UpdateUserSchema),
  controller.update.bind(controller),
)
router.delete('/:id', validateAdminOnly, validateParams(ObjectIdParamsSchema), controller.delete.bind(controller))

export const userRouter = router
