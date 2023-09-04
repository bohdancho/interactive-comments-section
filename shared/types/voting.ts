import mongoose from 'mongoose'
import { CommentData } from './comment'

export enum VotingChoiceEnum {
  null,
  'upvote',
  'downvote',
}

export interface VotingData {
  _id: mongoose.Types.ObjectId
  comment: mongoose.Types.ObjectId | CommentData
  rating: number
  userChoices: {
    [VotingChoiceEnum.downvote]: mongoose.Types.ObjectId[]
    [VotingChoiceEnum.upvote]: mongoose.Types.ObjectId[]
  }
}
