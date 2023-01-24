import { User } from './user'
import { Comment } from './comment'

export interface Data {
  currentUser: User
  comments: Comment[]
}
