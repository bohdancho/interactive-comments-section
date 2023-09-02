import Joi from 'joi'

export const StringObjectIdSchema = Joi.string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .message('id param must be an oid')

export const ObjectIdSchema = Joi.object().keys({
  id: StringObjectIdSchema,
})
