import { Document } from 'mongoose'
import { IRepository } from './../repository/repository.interface'

export type IService<D extends Document> = IRepository<D>
