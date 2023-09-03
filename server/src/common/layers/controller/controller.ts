import express from 'express'
import mongoose, { UpdateQuery } from 'mongoose'
import { IService } from '../service.interface/service.interface'
import { IController } from './controller.interface'

export class Controller<D extends mongoose.Document, CreateDto, UpdateDto extends UpdateQuery<D>>
  implements IController
{
  constructor(private service: IService<D>) {}

  async getOne(req: express.Request, res: express.Response) {
    const objectId = new mongoose.Types.ObjectId(req.params.id)
    const item = await this.service.findOne(objectId)
    if (!item) {
      res.sendStatus(404)
      return
    }

    res.send(item)
  }

  async getAll(_req: express.Request, res: express.Response) {
    const items = await this.service.findAll()
    res.send(items)
  }

  async create(req: express.Request, res: express.Response) {
    const payload = <CreateDto>req.body

    try {
      const item = await this.service.create(payload)
      res.send(item)
    } catch (error) {
      res.sendStatus(400)
    }
  }

  async update(req: express.Request, res: express.Response) {
    const objectId = new mongoose.Types.ObjectId(req.params.id)
    const payload = <UpdateDto>req.body

    try {
      const item = await this.service.update(objectId, payload)
      res.send(item)
    } catch (error) {
      res.sendStatus(400)
    }
  }

  async delete(req: express.Request, res: express.Response) {
    const objectId = new mongoose.Types.ObjectId(req.params.id)
    try {
      await this.service.delete(objectId)
      res.sendStatus(200)
    } catch (error) {
      res.sendStatus(404)
    }
  }
}
