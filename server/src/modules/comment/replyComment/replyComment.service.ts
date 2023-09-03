import { ErrorNotFound, IService, Repository } from '@server/common'
import mongoose from 'mongoose'
import { rootCommentsService } from '../rootComment'
import { CreateReplyCommentDto, ReplyCommentDocument, UpdateReplyCommentDto } from './replyComment.types'

export class ReplyCommentService implements IService<ReplyCommentDocument> {
  constructor(private repository: Repository<ReplyCommentDocument>) {}

  findOne = (id: mongoose.Types.ObjectId) => this.repository.findOne(id)
  findAll = () => this.repository.findAll()
  create = async (payload: CreateReplyCommentDto) => {
    if (!rootCommentsService.findOne(payload.rootComment)) {
      throw new ErrorNotFound()
    }

    const reply = await this.repository.create(payload)
    await rootCommentsService.addReply(payload.rootComment, reply.id)

    return reply
  }
  update = (id: mongoose.Types.ObjectId, payload: UpdateReplyCommentDto) => this.repository.update(id, payload)
  delete = async (id: mongoose.Types.ObjectId) => {
    const reply = await this.repository.findOne(id)
    if (!reply) {
      throw new ErrorNotFound()
    }
    const rootCommentId = <mongoose.Types.ObjectId>reply.rootComment

    await rootCommentsService.removeReply(rootCommentId, reply.id)
    return this.repository.delete(id)
  }
}
