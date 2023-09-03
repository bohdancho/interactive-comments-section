import { IService, Repository } from '@server/common'
import mongoose, { UpdateQuery } from 'mongoose'
import { RootCommentDocument } from '.'

export class RootCommentService<D extends RootCommentDocument, CreateDto, UpdateDto extends mongoose.UpdateQuery<D>>
  implements IService<D, CreateDto, UpdateDto>
{
  constructor(private repository: Repository<D, CreateDto, UpdateQuery<D>>) {}

  findOne = (id: mongoose.Types.ObjectId) => this.repository.findOne(id)
  findAll = () => this.repository.findAll()
  create = (payload: CreateDto) => this.repository.create(payload)
  update = (id: mongoose.Types.ObjectId, payload: UpdateDto) => this.repository.update(id, payload)
  delete = (id: mongoose.Types.ObjectId) => this.repository.delete(id)

  addReply = (id: mongoose.Types.ObjectId, replyId: mongoose.Types.ObjectId) =>
    this.repository.update(id, { $push: { replies: replyId } })
  removeReply = (id: mongoose.Types.ObjectId, replyId: mongoose.Types.ObjectId) =>
    this.repository.update(id, { $pull: { replies: replyId } })
}
