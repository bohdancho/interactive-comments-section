import express from 'express'

const replyCommentsRouter = express.Router()

// replyCommentsRouter.get('/', getAllReplyComments)
// replyCommentsRouter.get('/:id', validateParams(ObjectIdSchema), getReplyComment)

// replyCommentsRouter.post('/', validatePayload(CreateReplyCommentSchema), createReplyComment)
// replyCommentsRouter.put(
//   '/:id',
//   validateParams(ObjectIdSchema),
//   validatePayload(UpdateReplyCommentSchema),
//   updateReplyComment,
// )
// replyCommentsRouter.delete('/:id', validateParams(ObjectIdSchema), deleteReplyComment)

export const replyCommentsRouteMiddleware = replyCommentsRouter
