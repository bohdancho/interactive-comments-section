import { ObjectIdSchema } from '@server/common'
import Joi from 'joi'

export const CreateRootCommentSchema = Joi.object({
  author: ObjectIdSchema,
})

export const UpdateRootCommentSchema = Joi.object({
  body: Joi.string(),
}).min(1)
