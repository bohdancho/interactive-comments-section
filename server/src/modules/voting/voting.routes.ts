import { Controller, ObjectIdParamsSchema, Repository } from '@server/common'
import { validateParams, validatePayload } from '@server/middleware'
import express from 'express'
import { VotingModel } from './voting.model'
import { VotingService } from './voting.service'
import { CreateVotingDto, UpdateVotingDto, VotingDocument } from './voting.types'
import { UpdateVotingSchema } from './voting.validation'

const repository = new Repository<VotingDocument>(VotingModel)
const service = new VotingService(repository)
const controller = new Controller<VotingDocument, CreateVotingDto, UpdateVotingDto>(service)

const router = express.Router()

router.put(
  '/:id',
  validateParams(ObjectIdParamsSchema),
  validatePayload(UpdateVotingSchema),
  controller.update.bind(controller),
)

export const votingRouter = router
export const votingService = service
