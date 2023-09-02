import { ObjectIdSchema, validateParams } from '@server/middleware'
import express from 'express'
import {
  createRootComment,
  deleteRootComment,
  getAllRootComments,
  getRootComment,
  updateRootComment,
} from './rootComment.controller'

const rootCommentsRouter = express.Router()

rootCommentsRouter.get('/', getAllRootComments)
rootCommentsRouter.get('/:id', validateParams(ObjectIdSchema), getRootComment)

rootCommentsRouter.post('/', createRootComment)
rootCommentsRouter.put('/:id', validateParams(ObjectIdSchema), updateRootComment)
rootCommentsRouter.delete('/:id', validateParams(ObjectIdSchema), deleteRootComment)

export const rootCommentsRouteMiddleware = rootCommentsRouter
