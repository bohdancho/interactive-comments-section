import { Service } from '@server/common'
import { Types } from 'mongoose'
import { CreateRootCommentDto, RootCommentDocument, RootCommentModel, UpdateRootCommentDto } from '.'

export class RootCommentService implements Service<RootCommentDocument> {
  async findOne(id: Types.ObjectId) {
    return await RootCommentModel.findById(id)
  }

  async findAll() {
    return await RootCommentModel.find()
  }

  async create({ author }: CreateRootCommentDto) {
    return await new RootCommentModel({ body: '', author, createdAt: Date.now(), replies: [] }).save()
  }

  async update(id: Types.ObjectId, payload: UpdateRootCommentDto) {
    return await RootCommentModel.findByIdAndUpdate(id, payload, { new: true })
  }

  async delete(id: Types.ObjectId) {
    return await RootCommentModel.findByIdAndDelete(id)
  }
}

export const rootCommentService = new RootCommentService()
