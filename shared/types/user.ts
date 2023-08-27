import { ObjectId } from 'mongoose'

export interface UserData {
  _id: ObjectId
  avatar: string
  username: string
}
