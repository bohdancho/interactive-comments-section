import Joi from 'joi'

export const ObjectIdSchema = Joi.object().keys({
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .message('id param must be an oid'),
})
