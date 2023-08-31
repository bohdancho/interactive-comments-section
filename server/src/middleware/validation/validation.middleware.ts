import { NextFunction, Request, Response } from 'express'
import { ObjectIdSchema } from '.'

export const validateObjectIdParam = (req: Request, res: Response, next: NextFunction) => {
  const { error } = ObjectIdSchema.validate(req.params.id)
  if (error) {
    res.status(400).send(error.details[0].message)
  } else {
    next()
  }
}
