import { API_ROUTE_USER_PREFIX } from '@shared/constants'
import { Router } from 'express'
import { userRouteMiddleware } from './modules'

export const roudeMiddlewares: Array<{ prefix: string; router: Router }> = [
  { prefix: API_ROUTE_USER_PREFIX, router: userRouteMiddleware },
]
