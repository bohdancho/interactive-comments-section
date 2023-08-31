import Joi from 'joi'

export const ObjectIdSchema = Joi.string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .message('must be an oid')
