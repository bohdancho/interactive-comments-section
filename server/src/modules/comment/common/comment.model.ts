import { UserModel } from '@server/modules/user'
import { VotingModel } from '@server/modules/voting'
import { Schema } from 'mongoose'

export const CommentCommonSchema = {
  createdAt: { type: Number, required: true },
  body: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  voting: { type: Schema.Types.ObjectId, ref: 'Voting', required: true },
}
export const commentPopulatePaths = [
  { path: 'author', model: UserModel },
  { path: 'voting', model: VotingModel },
]
