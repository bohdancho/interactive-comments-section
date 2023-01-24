import { Comment } from './comment.model'

export type Reply = Comment & { replyingTo: string }
