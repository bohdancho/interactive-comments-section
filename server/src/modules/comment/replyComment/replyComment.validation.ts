import { ObjectIdSchema } from '@server/common'
import Joi from 'joi'

export const CreateReplyCommentSchema = Joi.object({
  author: Joi.string().required(),
  replyToUser: Joi.string().required(),
  rootCommentId: ObjectIdSchema.required(),
})

export const UpdateReplyCommentSchema = Joi.object({
  body: Joi.string(),
}).min(1)
