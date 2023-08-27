import { VotingData } from '../'

export interface CommentData {
  id: number
  createdAt: number
  body: string
  author: string
  voting: VotingData
}
