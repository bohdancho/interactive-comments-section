import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

export const validateParams = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.params)
  if (error) {
    res.status(400).send(error.details[0].message)
  } else {
    next()
  }
}

export const validatePayload = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body)
  if (error) {
    res.status(400).send(error.details[0].message)
  } else {
    next()
  }
}
