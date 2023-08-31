import * as Joi from 'joi'

export const CreateUserSchema = Joi.object({
  username: Joi.string().required(),
  avatar: Joi.string().required(),
})

export const UpdateUserSchema = Joi.object({
  username: Joi.string(),
  avatar: Joi.string(),
}).min(1)
