import { Service } from '@server/common'
import { Types } from 'mongoose'
import { RootCommentModel, rootCommentService } from '../rootComment'
import { ReplyCommentModel } from './replyComment.model'
import { CreateReplyCommentDto, ReplyCommentDocument, UpdateReplyCommentDto } from './replyComment.types'

export class ReplyCommentService implements Service<ReplyCommentDocument> {
  async findOne(id: Types.ObjectId) {
    return await ReplyCommentModel.findById(id)
  }

  async findAll() {
    return await ReplyCommentModel.find()
  }

  async create({ author, replyToUser, rootCommentId }: CreateReplyCommentDto) {
    const rootComment = await rootCommentService.findOne(rootCommentId)
    if (!rootComment) return null

    const replyComment = new ReplyCommentModel({
      body: '',
      author,
      createdAt: Date.now(),
      replyToUser,
      rootCommentId,
    })

    rootComment.replies.push(replyComment.id)

    await rootComment.save()
    await replyComment.save()

    return replyComment
  }

  async update(id: Types.ObjectId, payload: UpdateReplyCommentDto) {
    return await ReplyCommentModel.findByIdAndUpdate(id, payload, { new: true })
  }

  async delete(id: Types.ObjectId) {
    const replyComment = await ReplyCommentModel.findById(id)
    const rootComment = await RootCommentModel.findById(replyComment?.rootCommentId)

    if (!replyComment || !rootComment) return null

    replyComment.deleteOne()
    rootComment.updateOne({ $pull: { replies: id } })

    return replyComment
  }
}

export const replyCommentService = new ReplyCommentService()
