import mongoose from 'mongoose'

export interface UserData {
  _id: mongoose.Types.ObjectId
  avatar: string
  username: string
}
