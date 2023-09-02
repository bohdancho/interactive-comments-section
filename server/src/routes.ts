import {
  API_ROUTE_REPLY_COMMENTS_PREFIX,
  API_ROUTE_ROOT_COMMENTS_PREFIX,
  API_ROUTE_USER_PREFIX,
} from '@shared/constants'
import { Router } from 'express'
import { replyCommentsRouteMiddleware, rootCommentsRouteMiddleware, userRouteMiddleware } from './modules'

export const roudeMiddlewares: Array<{ prefix: string; router: Router }> = [
  { prefix: API_ROUTE_USER_PREFIX, router: userRouteMiddleware },
  { prefix: API_ROUTE_ROOT_COMMENTS_PREFIX, router: rootCommentsRouteMiddleware },
  { prefix: API_ROUTE_REPLY_COMMENTS_PREFIX, router: replyCommentsRouteMiddleware },
]
