import { Comment } from './comment'
import { User } from './user'

export interface Data {
  currentUser: User
  comments: Comment[]
  commentsCount: number
}
