import { ObjectId } from 'mongoose'
import { VotingData } from '../'

export interface CommentData {
  _id: ObjectId
  createdAt: number
  body: string
  author: ObjectId
  voting: VotingData
}
