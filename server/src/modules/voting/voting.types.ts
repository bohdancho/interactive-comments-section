import { VotingData } from '@shared/types'
import mongoose from 'mongoose'

export type VotingDocument = VotingData & mongoose.Document

export type CreateVotingDto = Pick<VotingData, 'comment'>
export interface UpdateVotingDto {
  action: VotingChoiceEnum
  user: mongoose.Types.ObjectId
}

export enum VotingChoiceEnum {
  null,
  'upvote',
  'downvote',
}
