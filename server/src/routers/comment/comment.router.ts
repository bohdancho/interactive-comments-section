import { router } from '@server/app'
import { addComment, deleteComment, editComment, getAllRootComments } from './procedures'

export const commentRouter = () =>
  router({
    getAllRootComments: getAllRootComments(),
    addComment: addComment(),
    editComment: editComment(),
    deleteComment: deleteComment(),
  })
