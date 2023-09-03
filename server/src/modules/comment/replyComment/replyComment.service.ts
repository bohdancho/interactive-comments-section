// import { ErrorNotFound, IOService, Repository } from '@server/common'
// import { Types, UpdateQuery } from 'mongoose'
// import { RootCommentModel, rootCommentService } from '../rootComment'
// import { ReplyCommentModel } from './replyComment.model'
// import { ReplyCommentDocument, UpdateReplyCommentDto } from './replyComment.types'

// export class ReplyCommentService<D extends ReplyCommentDocument, CreateDto, UpdateDto extends UpdateQuery<D>>
//   implements IOService<ReplyCommentDocument>
// {
//   constructor(private repository: Repository<D, CreateDto, UpdateDto>) {}

//   async findOne(id: Types.ObjectId) {
//     return await ReplyCommentModel.findById(id)
//   }

//   async findAll() {
//     return await ReplyCommentModel.find()
//   }

//   async create({ author, replyToUser, rootCommentId }: CreateDto) {
//     const rootComment = await rootCommentService.findOne(rootCommentId)
//     if (!rootComment) throw new ErrorNotFound()

//     const replyComment = new ReplyCommentModel({
//       body: '',
//       author,
//       createdAt: Date.now(),
//       replyToUser,
//       rootCommentId,
//     })

//     rootComment.replies.push(replyComment.id)

//     await rootComment.save()
//     await replyComment.save()

//     return replyComment
//   }

//   update(id: Types.ObjectId, payload: UpdateReplyCommentDto)

//   async delete(id: Types.ObjectId) {
//     const replyComment = await ReplyCommentModel.findById(id)
//     const rootComment = await RootCommentModel.findById(replyComment?.rootCommentId)

//     if (!replyComment || !rootComment) throw new ErrorNotFound()

//     replyComment.deleteOne()
//     rootComment.updateOne({ $pull: { replies: id } })
//   }
// }

// export const replyCommentService = new ReplyCommentService()
