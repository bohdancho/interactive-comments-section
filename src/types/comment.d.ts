import { User } from './user'

export interface BaseComment {
  id: number
  content: string
  createdAt: string | number
  upvotedBy: string[]
  downvotedBy: string[]
  user: User
}

export type Comment = BaseComment & { replies: Reply[] }
export type Reply = BaseComment & { replyingTo: string }
