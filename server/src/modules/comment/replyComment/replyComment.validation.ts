import { StringObjectIdSchema } from '@server/middleware'
import Joi from 'joi'

export const CreateReplyCommentSchema = Joi.object({
  author: Joi.string().required(),
  replyToUser: Joi.string().required(),
  rootCommentId: StringObjectIdSchema.required(),
})

export const UpdateReplyCommentSchema = Joi.object({
  body: Joi.string(),
}).min(1)
