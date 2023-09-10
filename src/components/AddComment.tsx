import { User } from '@prisma/client'
import { UserContext } from '@src/providers'
import { UIButton, UITextarea } from '@src/ui'
import { api } from '@src/utils'
import dayjs from 'dayjs'
import { useContext, useState } from 'react'

export function AddComment({
  reply,
}: {
  reply?: {
    replyToUser: string
    rootCommentId: number
    onReply: () => void
  }
}) {
  const currentUser = useContext(UserContext) as User
  const utils = api.useContext()
  const mutation = api.comment.addComment.useMutation({
    async onMutate({ body, rootCommentId }) {
      await utils.comment.getAllRootComments.cancel()
      const prevData = utils.comment.getAllRootComments.getData()
      utils.comment.getAllRootComments.setData(undefined, (old) => {
        const optimisticComment = {
          createdAt: dayjs().toISOString(),
          body,
          author: currentUser,
          authorId: currentUser.id,
          _count: {
            userVotes: 0,
            author: 1,
            replies: 0,
            rootComment: 0,
          },
          replies: [],
          rootCommentId: rootCommentId ?? null,
          rootComment: null,
          rating: 0,
          id: Math.random(),
        }

        if (!old) return [optimisticComment]
        if (!rootCommentId) {
          return [...old, optimisticComment]
        }
        return old.map((comment) => {
          const optimisticReply: (typeof comment.replies)[number] = optimisticComment

          return comment.id === rootCommentId ? { ...comment, replies: [...comment.replies, optimisticReply] } : comment
        })
      })

      return { prevData }
    },
    onError(_err, _newPost, ctx) {
      utils.comment.getAllRootComments.setData(undefined, ctx?.prevData)
    },
    onSettled() {
      utils.comment.getAllRootComments.invalidate()
    },
  })
  const [focusTextarea, setFocusTextarea] = useState(false)
  const [commentText, setCommentText] = useState('')

  const addComment = () => {
    const trimmedValue = commentText.trim()

    if (trimmedValue === '') {
      setCommentText('')
      setFocusTextarea(true)
      return
    }

    if (reply) {
      reply.onReply()
    }
    mutation.mutate({ body: trimmedValue, rootCommentId: reply?.rootCommentId })
    setCommentText('')
  }

  return (
    <form className='grid grid-cols-2 items-center gap-16 rounded bg-white px-16 pb-12 pt-16 tablet:grid-cols-[min-content_auto_min-content] tablet:items-start tablet:p-24'>
      <UITextarea
        value={commentText}
        setValue={setCommentText}
        className='col-span-2 tablet:col-span-1 tablet:col-start-2'
        prefix={reply ? `@${reply.replyToUser} ` : undefined}
        focusOnInit={!!reply}
        focusTrigger={focusTextarea}
        setFocusTrigger={setFocusTextarea}
        placeholder={!reply ? 'Add a comment...' : undefined}
        onEnter={addComment}
      ></UITextarea>
      <img
        className='w-32 tablet:col-start-1 tablet:row-start-1 tablet:mt-4 tablet:min-w-[40px]'
        src={`./avatars/image-${currentUser.name}.webp`}
        alt={currentUser.name}
      ></img>
      <UIButton onClick={addComment} className='justify-self-end'>
        {reply ? 'Reply' : 'Send'}
      </UIButton>
    </form>
  )
}
