import { useReducer } from 'react'
import * as types from '../../types'

export function CommentRating({ rating }: Pick<types.Comment, 'rating'>) {
  return <div className='rounded-large bg-very-light-gray'>+ {rating} -</div>
}
