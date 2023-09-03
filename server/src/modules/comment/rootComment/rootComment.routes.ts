import { Controller, ObjectIdParamsSchema, Repository } from '@server/common'
import { validateParams, validatePayload } from '@server/middleware'
import express from 'express'
import { RootCommentModel } from './rootComment.model'
import { RootCommentService } from './rootComment.service'
import { CreateRootCommentDto, RootCommentDocument, UpdateRootCommentDto } from './rootComment.types'
import { CreateRootCommentSchema, UpdateRootCommentSchema } from './rootComment.validation'

const rootCommentRepository = new Repository<RootCommentDocument, CreateRootCommentDto, UpdateRootCommentDto>(
  RootCommentModel,
)
const rootCommentService = new RootCommentService<RootCommentDocument, CreateRootCommentDto, UpdateRootCommentDto>(
  rootCommentRepository,
)
const rootCommentController = new Controller<RootCommentDocument, CreateRootCommentDto, UpdateRootCommentDto>(
  rootCommentService,
)

const rootCommentsRouter = express.Router()

rootCommentsRouter.get('/', rootCommentController.getAll.bind(rootCommentController))
rootCommentsRouter.get(
  '/:id',
  validateParams(ObjectIdParamsSchema),
  rootCommentController.getOne.bind(rootCommentController),
)

rootCommentsRouter.post(
  '/',
  validatePayload(CreateRootCommentSchema),
  rootCommentController.create.bind(rootCommentController),
)
rootCommentsRouter.put(
  '/:id',
  validateParams(ObjectIdParamsSchema),
  validatePayload(UpdateRootCommentSchema),
  rootCommentController.update.bind(rootCommentController),
)
rootCommentsRouter.delete(
  '/:id',
  validateParams(ObjectIdParamsSchema),
  rootCommentController.delete.bind(rootCommentController),
)

export const rootCommentsRouteMiddleware = rootCommentsRouter
