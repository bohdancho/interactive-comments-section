import { Controller, ObjectIdParamsSchema, Repository } from '@server/common'
import { validateParams, validatePayload } from '@server/middleware'
import express from 'express'
import { UpdateCommentDto } from '../common/comment.dto'
import { RootCommentModel } from './rootComment.model'
import { RootCommentService } from './rootComment.service'
import { CreateRootCommentDto, RootCommentDocument } from './rootComment.types'
import { CreateRootCommentSchema, UpdateRootCommentSchema } from './rootComment.validation'

const repository = new Repository<RootCommentDocument>(RootCommentModel)
const service = new RootCommentService(repository)
const controller = new Controller<RootCommentDocument, CreateRootCommentDto, UpdateCommentDto>(service)

const router = express.Router()

router.get('/', controller.getAll.bind(controller))
router.get('/:id', validateParams(ObjectIdParamsSchema), controller.getOne.bind(controller))

router.post('/', validatePayload(CreateRootCommentSchema), controller.create.bind(controller))
router.put(
  '/:id',
  validateParams(ObjectIdParamsSchema),
  validatePayload(UpdateRootCommentSchema),
  controller.update.bind(controller),
)
router.delete('/:id', validateParams(ObjectIdParamsSchema), controller.delete.bind(controller))

export const rootCommentsService = service
export const rootCommentsRouter = router
