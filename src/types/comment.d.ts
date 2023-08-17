import { User } from './user'

export interface Comment {
  id: number
  content: string
  createdAt: string | number
  upvotedBy: string[]
  downvotedBy: string[]
  user: User
  replies: Reply[]
}

export type Reply = Omit<Comment, 'replies'> & { replyingTo: string }
