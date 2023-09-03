import { Controller, ObjectIdParamsSchema, Repository } from '@server/common'
import { validateParams, validatePayload } from '@server/middleware'
import express from 'express'
import { UpdateCommentDto } from '../common/comment.dto'
import { ReplyCommentModel } from './replyComment.model'
import { ReplyCommentService } from './replyComment.service'
import { CreateReplyCommentDto, ReplyCommentDocument } from './replyComment.types'
import { CreateReplyCommentSchema, UpdateReplyCommentSchema } from './replyComment.validation'

const repository = new Repository<ReplyCommentDocument>(ReplyCommentModel)
const service = new ReplyCommentService(repository)
const controller = new Controller<ReplyCommentDocument, CreateReplyCommentDto, UpdateCommentDto>(service)

const router = express.Router()

router.get('/', controller.getAll.bind(controller))
router.get('/:id', validateParams(ObjectIdParamsSchema), controller.getOne.bind(controller))

router.post('/', validatePayload(CreateReplyCommentSchema), controller.create.bind(controller))
router.put(
  '/:id',
  validateParams(ObjectIdParamsSchema),
  validatePayload(UpdateReplyCommentSchema),
  controller.update.bind(controller),
)
router.delete('/:id', validateParams(ObjectIdParamsSchema), controller.delete.bind(controller))

export const replyCommentRouter = router
export const replyCommentService = service
