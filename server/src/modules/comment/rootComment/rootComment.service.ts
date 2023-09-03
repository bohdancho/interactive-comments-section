import { ErrorNotFound, IService, Repository } from '@server/common'
import mongoose from 'mongoose'
import { replyCommentService } from '../replyComment'
import { CreateRootCommentDto, RootCommentDocument, UpdateRootCommentDto } from './rootComment.types'

export class RootCommentService implements IService<RootCommentDocument> {
  constructor(private repository: Repository<RootCommentDocument>) {}

  findOne = (id: mongoose.Types.ObjectId) => this.repository.findOne(id)
  findAll = () => this.repository.findAll()
  create = (payload: CreateRootCommentDto) => this.repository.create(payload)
  update = (id: mongoose.Types.ObjectId, payload: UpdateRootCommentDto) => this.repository.update(id, payload)
  delete = async (id: mongoose.Types.ObjectId) => {
    const comment = await this.findOne(id)
    if (!comment) {
      throw new ErrorNotFound()
    }

    const replies = <mongoose.Types.ObjectId[]>(<unknown>comment.replies)
    replies.forEach(async (replyId) => await replyCommentService.delete(replyId, false))
    return this.repository.delete(id)
  }

  addReply = (id: mongoose.Types.ObjectId, replyId: mongoose.Types.ObjectId) =>
    this.repository.update(id, { $push: { replies: replyId } })
  removeReply = (id: mongoose.Types.ObjectId, replyId: mongoose.Types.ObjectId) =>
    this.repository.update(id, { $pull: { replies: replyId } })
}
