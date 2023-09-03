import mongoose from 'mongoose'
import { UserData } from '../'

export interface CommentData {
  _id: mongoose.Types.ObjectId
  createdAt: number
  body: string
  author: mongoose.Types.ObjectId | UserData
  // voting: VotingData
}
