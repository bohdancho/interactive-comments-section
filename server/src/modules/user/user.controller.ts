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
  if (!users) {
    return res.sendStatus(500)
  }

  res.send(users)
}

export const createUser = async (req: Request, res: Response) => {
  const payload = <CreateUserDto>req.body
  const user = await userService.create(payload)
  if (!user) {
    return res.sendStatus(404)
  }

  res.send(user)
}

export const updateUser = async (req: Request, res: Response) => {
  const objectId = new mongoose.Types.ObjectId(req.params.id)
  const payload = <UpdateUserDto>req.body

  const user = await userService.update(objectId, payload)
  if (!user) {
    return res.sendStatus(404)
  }

  res.send(user)
}

export const deleteUser = async (req: Request, res: Response) => {
  const objectId = new mongoose.Types.ObjectId(req.params.id)
  const user = await userService.delete(objectId)
  if (!user) {
    return res.sendStatus(404)
  }

  res.sendStatus(200)
}
