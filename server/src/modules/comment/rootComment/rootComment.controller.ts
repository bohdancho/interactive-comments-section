import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { rootCommentService } from './rootComment.service'
import { CreateRootCommentDto, UpdateRootCommentDto } from './rootComment.types'

export const getRootComment = async (req: Request, res: Response) => {
  const objectId = new mongoose.Types.ObjectId(req.params.id)
  const comment = await rootCommentService.findOne(objectId)
  if (!comment) {
    return res.sendStatus(404)
  }

  res.send(comment)
}

export const getAllRootComments = async (_req: Request, res: Response) => {
  const comments = await rootCommentService.findAll()
  res.send(comments)
}

export const createRootComment = async (req: Request, res: Response) => {
  const payload = <CreateRootCommentDto>req.body
  const comment = await rootCommentService.create(payload)

  res.send(comment)
}

export const updateRootComment = async (req: Request, res: Response) => {
  const objectId = new mongoose.Types.ObjectId(req.params.id)
  const payload = <UpdateRootCommentDto>req.body

  try {
    const comment = await rootCommentService.update(objectId, payload)
    res.send(comment)
  } catch (error) {
    return res.sendStatus(404)
  }
}

export const deleteRootComment = async (req: Request, res: Response) => {
  const objectId = new mongoose.Types.ObjectId(req.params.id)
  try {
    await rootCommentService.delete(objectId)
    res.sendStatus(200)
  } catch (error) {
    return res.sendStatus(404)
  }
}
