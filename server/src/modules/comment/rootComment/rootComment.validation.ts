import { StringObjectIdSchema } from '@server/middleware'
import Joi from 'joi'

export const CreateRootCommentSchema = Joi.object({
  author: StringObjectIdSchema,
})

export const UpdateRootCommentSchema = Joi.object({
  body: Joi.string(),
}).min(1)
