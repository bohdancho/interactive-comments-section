import { ErrorNotFound, IService, Repository } from '@server/common'
import mongoose from 'mongoose'
import { UpdateVotingDto, VotingChoiceEnum, VotingDocument } from './voting.types'

export class VotingService implements IService<VotingDocument> {
  constructor(protected repository: Repository<VotingDocument>) {}

  findOne = (id: mongoose.Types.ObjectId) => this.repository.findOne(id)
  findAll = () => this.repository.findAll()
  create = () => this.repository.create()
  update = async (id: mongoose.Types.ObjectId, { action, user }: UpdateVotingDto) => {
    const voting = await this.findOne(id)
    if (!voting) throw new ErrorNotFound()

    const updateQuery = VotingService.getUpdateQuery(voting, action, user._id)

    return voting.updateOne(updateQuery)
  }
  delete = (id: mongoose.Types.ObjectId) => this.repository.delete(id)

  private static getOldChoice(voting: VotingDocument, userId: mongoose.Types.ObjectId): VotingChoiceEnum {
    if (voting.userChoices[VotingChoiceEnum.downvote].includes(userId)) {
      return VotingChoiceEnum.downvote
    }
    if (voting.userChoices[VotingChoiceEnum.upvote].includes(userId)) {
      return VotingChoiceEnum.upvote
    }
    return VotingChoiceEnum.null
  }

  private static getUpdateQuery(
    voting: VotingDocument,
    action: VotingChoiceEnum,
    userId: mongoose.Types.ObjectId,
  ): mongoose.UpdateQuery<VotingDocument> {
    const oldChoice = VotingService.getOldChoice(voting, userId)
    if (action === oldChoice) {
      return { $pull: { [`userChoices.${action}`]: userId } }
    }
    return {
      $pull: { [`userChoices.${oldChoice}`]: userId },
      $push: { [`userChoices.${action}`]: userId },
    }
  }
}
