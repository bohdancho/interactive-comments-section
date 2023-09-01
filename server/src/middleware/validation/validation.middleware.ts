import { config } from 'dotenv'
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

config()
const { ADMIN_TOKEN } = process.env as { ADMIN_TOKEN: string }
export const validateAdminOnly = (req: Request, res: Response, next: NextFunction) => {
  const isAdmin = req.headers['admin-token'] === ADMIN_TOKEN
  if (!isAdmin) {
    res.status(403).send('No admin token provided')
  } else {
    next()
  }
}
