import { ObjectId } from 'mongoose'
import { UserData } from '../'

export interface CommentData {
  _id: ObjectId
  createdAt: number
  body: string
  author: ObjectId | UserData
  // voting: VotingData
}
