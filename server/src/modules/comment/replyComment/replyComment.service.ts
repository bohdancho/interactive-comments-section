import { ErrorNotFound, IService, Repository } from '@server/common'
import { votingService } from '@server/modules/voting'
import mongoose from 'mongoose'
import { UpdateCommentDto } from '../common/comment.dto'
import { rootCommentsService } from '../rootComment'
import { replyPopulatePaths } from './replyComment.model'
import { CreateReplyCommentDto, ReplyCommentDocument } from './replyComment.types'

export class ReplyCommentService implements IService<ReplyCommentDocument> {
  constructor(private repository: Repository<ReplyCommentDocument>) {}

  findOne = (id: mongoose.Types.ObjectId) => this.repository.findOne(id).populate(replyPopulatePaths)
  findAll = () => this.repository.findAll().populate(replyPopulatePaths)
  create = async (payload: CreateReplyCommentDto) => {
    const rootComment = await rootCommentsService.findOne(payload.rootComment)
    if (!rootComment) {
      throw new ErrorNotFound()
    }

    const voting = await votingService.create()
    const reply = await this.repository.create({ ...payload, createdAt: Date.now(), voting: voting._id })
    await rootCommentsService.addReply(payload.rootComment, reply.id)

    return reply
  }
  update = (id: mongoose.Types.ObjectId, payload: UpdateCommentDto) => this.repository.update(id, payload)
  delete = async (id: mongoose.Types.ObjectId, removeFromRootComment = true) => {
    if (removeFromRootComment) {
      await this.removeFromRootComment(id)
    }

    const comment = <ReplyCommentDocument>await this.findOne(id)
    const voting = comment.voting

    votingService.delete(voting._id)
    return this.repository.delete(id)
  }

  removeFromRootComment = async (replyId: mongoose.Types.ObjectId) => {
    const reply = await this.findOne(replyId)
    if (!reply) {
      throw new ErrorNotFound()
    }
    const rootComment = reply.rootComment

    await rootCommentsService.removeReply(rootComment._id, reply.id)
  }
}
