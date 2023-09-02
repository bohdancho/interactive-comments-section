import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { replyCommentService } from './replyComment.service'
import { CreateReplyCommentDto, UpdateReplyCommentDto } from './replyComment.types'

export const getReplyComment = async (req: Request, res: Response) => {
  const objectId = new mongoose.Types.ObjectId(req.params.id)
  const comment = await replyCommentService.findOne(objectId)
  if (!comment) {
    return res.sendStatus(404)
  }

  res.send(comment)
}

export const getAllReplyComments = async (_req: Request, res: Response) => {
  const comments = await replyCommentService.findAll()
  res.send(comments)
}

export const createReplyComment = async (req: Request, res: Response) => {
  const payload = <CreateReplyCommentDto>req.body
  const comment = await replyCommentService.create(payload)

  res.send(comment)
}

export const updateReplyComment = async (req: Request, res: Response) => {
  const objectId = new mongoose.Types.ObjectId(req.params.id)
  const payload = <UpdateReplyCommentDto>req.body

  const comment = await replyCommentService.update(objectId, payload)
  if (!comment) {
    return res.sendStatus(404)
  }

  res.send(comment)
}

export const deleteReplyComment = async (req: Request, res: Response) => {
  const objectId = new mongoose.Types.ObjectId(req.params.id)
  const comment = await replyCommentService.delete(objectId)
  if (!comment) {
    return res.sendStatus(404)
  }

  res.sendStatus(200)
}
