import express from 'express'

export interface IController {
  getOne(req: express.Request, res: express.Response): void
  getAll(req: express.Request, res: express.Response): void
  create(req: express.Request, res: express.Response): void
  update(req: express.Request, res: express.Response): void
  delete(req: express.Request, res: express.Response): void
}
