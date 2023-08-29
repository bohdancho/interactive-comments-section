import { Request, Response } from 'express'
import mongoose, { isValidObjectId } from 'mongoose'
import { userService } from './user.service'

export const getUser = async (req: Request, res: Response) => {
  const id = req.params.id
  if (!isValidObjectId(id)) {
    return res.sendStatus(400)
  }

  const objectId = new mongoose.Types.ObjectId(id)
  const user = await userService.findOne(objectId)
  if (!user) {
    return res.sendStatus(404)
  }

  res.send(user)
}

// export const createUser =
