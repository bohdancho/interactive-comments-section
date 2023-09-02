import { ObjectIdSchema, validateParams, validatePayload } from '@server/middleware'
import express from 'express'
import {
  createReplyComment,
  deleteReplyComment,
  getAllReplyComments,
  getReplyComment,
  updateReplyComment,
} from './replyComment.controller'
import { CreateReplyCommentSchema, UpdateReplyCommentSchema } from './replyComment.validation'

const replyCommentsRouter = express.Router()

replyCommentsRouter.get('/', getAllReplyComments)
replyCommentsRouter.get('/:id', validateParams(ObjectIdSchema), getReplyComment)

replyCommentsRouter.post('/', validatePayload(CreateReplyCommentSchema), createReplyComment)
replyCommentsRouter.put(
  '/:id',
  validateParams(ObjectIdSchema),
  validatePayload(UpdateReplyCommentSchema),
  updateReplyComment,
)
replyCommentsRouter.delete('/:id', validateParams(ObjectIdSchema), deleteReplyComment)

export const replyCommentsRouteMiddleware = replyCommentsRouter
