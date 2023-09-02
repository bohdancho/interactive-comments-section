import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { userService } from './user.service'
import { CreateUserDto, UpdateUserDto } from './user.types'

export const getUser = async (req: Request, res: Response) => {
  const objectId = new mongoose.Types.ObjectId(req.params.id)
  const user = await userService.findOne(objectId)
  if (!user) {
    return res.sendStatus(404)
  }

  res.send(user)
}

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.findAll()
  res.send(users)
}

export const createUser = async (req: Request, res: Response) => {
  const payload = <CreateUserDto>req.body
  const user = await userService.create(payload)

  res.send(user)
}

export const updateUser = async (req: Request, res: Response) => {
  const objectId = new mongoose.Types.ObjectId(req.params.id)
  const payload = <UpdateUserDto>req.body

  try {
    const user = await userService.update(objectId, payload)
    res.send(user)
  } catch (error) {
    res.sendStatus(404)
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const objectId = new mongoose.Types.ObjectId(req.params.id)
  try {
    await userService.delete(objectId)
    res.sendStatus(200)
  } catch (error) {
    return res.sendStatus(404)
  }
}
