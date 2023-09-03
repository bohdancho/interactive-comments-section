import { ErrorNotFound, IService, Repository } from '@server/common'
import mongoose from 'mongoose'
import { UpdateCommentDto } from '../common/comment.dto'
import { replyCommentService } from '../replyComment'
import { rootPopulatePaths } from './rootComment.model'
import { CreateRootCommentDto, RootCommentDocument } from './rootComment.types'

export class RootCommentService implements IService<RootCommentDocument> {
  constructor(private repository: Repository<RootCommentDocument>) {}

  findOne = (id: mongoose.Types.ObjectId) => this.repository.findOne(id).populate(rootPopulatePaths)
  findAll = () => this.repository.findAll().populate(rootPopulatePaths)
  create = (payload: CreateRootCommentDto) => this.repository.create({ ...payload, createdAt: Date.now() })
  update = (id: mongoose.Types.ObjectId, payload: UpdateCommentDto) => this.repository.update(id, payload)
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
