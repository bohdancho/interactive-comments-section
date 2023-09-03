import { ObjectIdSchema } from '@server/common'
import * as Joi from 'joi'
import { VotingChoiceEnum } from './voting.types'

export const UpdateVotingSchema = Joi.object({
  newVote: Joi.string()
    .valid(...Object.values(VotingChoiceEnum))
    .required(),
  user: ObjectIdSchema.required(),
}).min(1)
