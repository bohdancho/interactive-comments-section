import { ObjectId } from 'mongoose'

export interface VotingData {
  _id: ObjectId
  rating: number
  upvotedBy: string[]
  downvotedBy: string[]
}
