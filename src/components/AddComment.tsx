import { Dispatch, useContext, useState } from 'react'
import { DataDispatchContext } from '../providers/DataProvider'
import { UserContext } from '../providers/UserProvider'
import * as types from '../types'
import { Button, Image, Textarea } from '../ui'

export function AddComment({
  replyToUser,
  replyToId,
  onReply,
}: {
  replyToUser?: string
  replyToId?: number
  onReply?: () => void
}) {
  const currentUser = useContext(UserContext) as types.User
  const dataDispatch = useContext(DataDispatchContext) as Dispatch<types.Action>
  const [focusTextarea, setFocusTextarea] = useState(false)

  const addComment = () => {
    if (commentText === '') {
      setFocusTextarea(true)
      return
    }

    if (replyToId && onReply) {
      onReply()
      dataDispatch({ type: 'reply', payload: { text: commentText, replyToId } })
    } else {
      dataDispatch({ type: 'comment', payload: { text: commentText } })
    }
    setCommentText('')
  }

  const [commentText, setCommentText] = useState('')

  return (
    <form className='pt-16 px-16 pb-12 grid grid-cols-2 items-center gap-16 bg-white rounded tablet:p-24 tablet:grid-cols-[min-content_auto_min-content] tablet:items-start'>
      <Textarea
        value={commentText}
        setValue={setCommentText}
        className='col-span-2 tablet:col-span-1 tablet:col-start-2'
        fixedValue={replyToUser ? `@${replyToUser} ` : undefined}
        focusOnInit={!!replyToUser}
        focusTrigger={focusTextarea}
        setFocusTrigger={setFocusTextarea}
        placeholder={!replyToUser ? 'Add a comment...' : undefined}
      ></Textarea>
      <Image
        className='w-32 tablet:w-40 tablet:col-start-1 tablet:row-start-1 tablet:mt-4'
        image={currentUser.image}
        alt={currentUser.username}
      ></Image>
      <Button onClick={addComment} className='justify-self-end'>
        {replyToUser ? 'Reply' : 'Send'}
      </Button>
    </form>
  )
}
