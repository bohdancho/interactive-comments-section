import { ObjectIdSchema } from '@server/common'
import Joi from 'joi'

export const CreateReplyCommentSchema = Joi.object({
  author: ObjectIdSchema.required(),
  replyToUser: ObjectIdSchema.required(),
  rootComment: ObjectIdSchema.required(),
})

export const UpdateReplyCommentSchema = Joi.object({
  body: Joi.string(),
}).min(1)
