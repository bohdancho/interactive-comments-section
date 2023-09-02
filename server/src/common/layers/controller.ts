import express from 'express'
import mongoose from 'mongoose'
import { Service } from '../models'

export class Controller<D extends mongoose.Document, CreateDto, UpdateDto> {
  constructor(private service: Service<D>) {}

  async getOne(req: express.Request, res: express.Response) {
    const objectId = new mongoose.Types.ObjectId(req.params.id)
    const user = await this.service.findOne(objectId)
    if (!user) {
      return res.sendStatus(404)
    }

    res.send(user)
  }

  async getAll(req: express.Request, res: express.Response) {
    const users = await this.service.findAll()
    res.send(users)
  }

  async create(req: express.Request, res: express.Response) {
    const payload = <CreateDto>req.body
    const user = await this.service.create(payload)

    res.send(user)
  }

  async update(req: express.Request, res: express.Response) {
    const objectId = new mongoose.Types.ObjectId(req.params.id)
    const payload = <UpdateDto>req.body

    try {
      const user = await this.service.update(objectId, payload)
      res.send(user)
    } catch (error) {
      res.sendStatus(404)
    }
  }

  async delete(req: express.Request, res: express.Response) {
    const objectId = new mongoose.Types.ObjectId(req.params.id)
    try {
      await this.service.delete(objectId)
      res.sendStatus(200)
    } catch (error) {
      return res.sendStatus(404)
    }
  }
}
