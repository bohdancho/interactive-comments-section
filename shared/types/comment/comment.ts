import mongoose from 'mongoose'
import { UserData, VotingData } from '../'

export interface CommentData {
  _id: mongoose.Types.ObjectId
  createdAt: number
  body: string
  author: mongoose.Types.ObjectId | UserData
  voting: mongoose.Types.ObjectId | VotingData
}
