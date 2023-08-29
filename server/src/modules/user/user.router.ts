import express from 'express'
import { getUser } from '.'

const userRouter = express.Router()

userRouter.get('/:id', getUser)

export const userRouteMiddleware = userRouter
