import { DataDispatchContext, UserContext } from '@src/providers'
import * as types from '@src/types'
import { UIButton, UIImage, UITextarea } from '@src/ui'
import { Dispatch, useContext, useState } from 'react'

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
  const [commentText, setCommentText] = useState('')

  const addComment = () => {
    const trimmedValue = commentText.trim()

    if (trimmedValue === '') {
      setCommentText('')
      setFocusTextarea(true)
      return
    }

    if (replyToId && onReply) {
      onReply()
      dataDispatch({ type: 'reply', payload: { text: trimmedValue, replyToId } })
    } else {
      dataDispatch({ type: 'comment', payload: { text: trimmedValue } })
    }
    setCommentText('')
  }

  return (
    <form className='grid grid-cols-2 items-center gap-16 rounded bg-white px-16 pt-16 pb-12 tablet:grid-cols-[min-content_auto_min-content] tablet:items-start tablet:p-24'>
      <UITextarea
        value={commentText}
        setValue={setCommentText}
        className='col-span-2 tablet:col-span-1 tablet:col-start-2'
        prefix={replyToUser ? `@${replyToUser} ` : undefined}
        focusOnInit={!!replyToUser}
        focusTrigger={focusTextarea}
        setFocusTrigger={setFocusTextarea}
        placeholder={!replyToUser ? 'Add a comment...' : undefined}
        onEnter={addComment}
      ></UITextarea>
      <UIImage
        className='w-32 tablet:col-start-1 tablet:row-start-1 tablet:mt-4 tablet:w-40'
        image={currentUser.image}
        alt={currentUser.username}
      ></UIImage>
      <UIButton onClick={addComment} className='justify-self-end'>
        {replyToUser ? 'Reply' : 'Send'}
      </UIButton>
    </form>
  )
}
