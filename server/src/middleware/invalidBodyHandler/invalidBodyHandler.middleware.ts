import { NextFunction, Request, Response } from 'express'
import { ErrorWithStatus } from './invalidBodyHandler.types'

export const invalidBodyHandlerMiddleware = (err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && err.status === 400 && req.body) {
    res.status(400).send('Invalid body')
    return
  }

  next(err)
}
