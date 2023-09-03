import { Schema, model } from 'mongoose'
import { VotingChoiceEnum, VotingDocument } from './voting.types'

const VotingSchema = new Schema({
  comment: { type: Schema.Types.ObjectId, required: true },
  rating: { type: Number, default: 0 },
  userChoices: {
    [VotingChoiceEnum.downvote]: [{ type: Schema.Types.ObjectId }],
    [VotingChoiceEnum.upvote]: [{ type: Schema.Types.ObjectId }],
  },
  // upvotedBy: [{ type: Schema.Types.ObjectId }],
  // downvotedBy: [{ type: Schema.Types.ObjectId }],
})

export const VotingModel = model<VotingDocument>('Voting', VotingSchema)
