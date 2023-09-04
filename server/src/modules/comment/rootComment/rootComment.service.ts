import { ErrorNotFound, IService, Repository } from '@server/common'
import { commentPopulatePaths, votingService } from '@server/modules'
import mongoose from 'mongoose'
import { UpdateCommentDto } from '../common/comment.dto'
import { replyCommentService } from '../replyComment'
import { rootPopulatePaths } from './rootComment.model'
import { CreateRootCommentDto, RootCommentDocument } from './rootComment.types'

export class RootCommentService implements IService<RootCommentDocument> {
  constructor(private repository: Repository<RootCommentDocument>) {}

  findOne = (id: mongoose.Types.ObjectId) =>
    this.repository.findOne(id).populate(commentPopulatePaths).populate(rootPopulatePaths)
  findAll = () => this.repository.findAll().populate(rootPopulatePaths)
  create = async (payload: CreateRootCommentDto) => {
    const voting = await votingService.create()
    return this.repository.create({ ...payload, createdAt: Date.now(), voting: voting._id })
  }
  update = (id: mongoose.Types.ObjectId, payload: UpdateCommentDto) => this.repository.update(id, payload)
  delete = async (id: mongoose.Types.ObjectId) => {
    const comment = await this.findOne(id)
    if (!comment) {
      throw new ErrorNotFound()
    }

    const replies = <mongoose.Types.ObjectId[]>comment.replies
    replies.forEach(async (replyId) => await replyCommentService.delete(replyId, false))

    const voting = comment.voting
    votingService.delete(voting._id)

    return this.repository.delete(id)
  }

  addReply = (id: mongoose.Types.ObjectId, replyId: mongoose.Types.ObjectId) =>
    this.repository.update(id, { $push: { replies: replyId } })
  removeReply = (id: mongoose.Types.ObjectId, replyId: mongoose.Types.ObjectId) =>
    this.repository.update(id, { $pull: { replies: replyId } })
}
