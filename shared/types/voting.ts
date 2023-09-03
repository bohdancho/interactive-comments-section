import { VotingChoiceEnum } from '@server/modules'
import mongoose from 'mongoose'
import { CommentData } from './comment'

export interface VotingData {
  _id: mongoose.Types.ObjectId
  comment: mongoose.Types.ObjectId | CommentData
  rating: number
  userChoices: {
    [VotingChoiceEnum.downvote]: mongoose.Types.ObjectId[]
    [VotingChoiceEnum.upvote]: mongoose.Types.ObjectId[]
  }
}
