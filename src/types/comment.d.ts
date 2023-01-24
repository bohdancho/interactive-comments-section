import { User } from './user'

export interface Comment {
  id: number
  content: string
  createdAt: string
  rating: number
  user: User
  replies: Reply[]
}

export type Reply = Omit<Comment, 'replies'> & { replyingTo: string }
