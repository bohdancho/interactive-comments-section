import { User } from '@prisma/client'
import { UserContext } from '@src/providers'
import { UIButton, UITextarea } from '@src/ui'
import { useContext, useState } from 'react'

export function AddComment({
  replyToUser,
  rootCommentId,
  onReply,
}: {
  replyToUser?: string
  rootCommentId?: number
  onReply?: () => void
}) {
  const currentUser = useContext(UserContext) as User
  const [focusTextarea, setFocusTextarea] = useState(false)
  const [commentText, setCommentText] = useState('')

  const addComment = () => {
    const trimmedValue = commentText.trim()

    if (trimmedValue === '') {
      setCommentText('')
      setFocusTextarea(true)
      return
    }

    // if (replyToId && onReply) {
    //   onReply()
    //   dataDispatch({ type: 'reply', payload: { text: trimmedValue, replyToId } })
    // } else {
    //   dataDispatch({ type: 'comment', payload: { text: trimmedValue } })
    // }
    // setCommentText('')
  }

  return (
    <form className='grid grid-cols-2 items-center gap-16 rounded bg-white px-16 pb-12 pt-16 tablet:grid-cols-[min-content_auto_min-content] tablet:items-start tablet:p-24'>
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
      <img
        className='w-32 tablet:col-start-1 tablet:row-start-1 tablet:mt-4 tablet:min-w-[40px]'
        src={`./avatars/image-${currentUser.name}.webp`}
        alt={currentUser.name}
      ></img>
      <UIButton onClick={addComment} className='justify-self-end'>
        {replyToUser ? 'Reply' : 'Send'}
      </UIButton>
    </form>
  )
}
