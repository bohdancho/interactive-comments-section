import { ObjectIdSchema } from '@server/common'
import Joi from 'joi'

export const CreateRootCommentSchema = Joi.object({
  author: ObjectIdSchema.required(),
  body: Joi.string().min(1).required(),
})

export const UpdateRootCommentSchema = Joi.object({
  body: Joi.string(),
}).min(1)
