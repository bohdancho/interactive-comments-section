import { User } from './user'

export interface Comment {
  id: number
  content: string
  createdAt: string | number
  rating: number
  user: User
  replies: Reply[]
}

export type Reply = Omit<Comment, 'replies'> & { replyingTo: string }
