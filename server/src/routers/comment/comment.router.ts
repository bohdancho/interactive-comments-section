import { router } from '@server/app'
import { addComment, editComment, getAllRootComments } from './procedures'

export const commentRouter = () =>
  router({
    getAllRootComments: getAllRootComments(),
    addComment: addComment(),
    editComment: editComment(),
  })
