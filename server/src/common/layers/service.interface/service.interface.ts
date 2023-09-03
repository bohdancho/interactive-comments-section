import { Document, UpdateQuery } from 'mongoose'
import { IRepository } from './../repository/repository.interface'

export type IService<D extends Document, CreateDto, UpdateDto extends UpdateQuery<D>> = IRepository<
  D,
  CreateDto,
  UpdateDto
>
