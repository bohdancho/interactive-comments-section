import Joi from 'joi'
import { ObjectIdSchema } from './objectId.schema'

export const ObjectIdParamsSchema = Joi.object({
  id: ObjectIdSchema.required(),
})
