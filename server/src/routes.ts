import {
  API_ROUTE_REPLY_COMMENTS_PREFIX,
  API_ROUTE_ROOT_COMMENTS_PREFIX,
  API_ROUTE_USER_PREFIX,
} from '@shared/constants'
import { Router } from 'express'
import { replyCommentRouter, rootCommentsRouter, userRouter } from './modules'

export const roudeMiddlewares: Array<{ prefix: string; router: Router }> = [
  { prefix: API_ROUTE_USER_PREFIX, router: userRouter },
  { prefix: API_ROUTE_ROOT_COMMENTS_PREFIX, router: rootCommentsRouter },
  { prefix: API_ROUTE_REPLY_COMMENTS_PREFIX, router: replyCommentRouter },
]
