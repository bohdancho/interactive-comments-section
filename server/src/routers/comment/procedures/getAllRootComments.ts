import { Prisma } from '@prisma/client'
import { prisma, publicProcedure } from '@server/app'

const findCommentDto: Prisma.CommentSelect = {
  id: true,
  createdAt: true,
  body: true,
  author: true,
  rating: true,
  userVotes: true,
}

export const getAllRootComments = () =>
  publicProcedure.query(async ({ ctx }) => {
    const comments = await prisma.comment.findMany({
      where: { rootComment: null },
      select: {
        ...findCommentDto,
        replies: {
          select: {
            ...findCommentDto,
            rootComment: {
              select: { author: { select: { name: true } } },
            },
          },
        },
      },
      orderBy: {
        rating: 'desc',
      },
    })

    return comments.map((comment) => ({
      ...comment,
      replies: comment.replies.map((reply) => ({
        ...reply,
        userVotes: undefined,
        myVote: reply.userVotes.find((vote) => vote.userId === ctx.user.id)?.choice,
      })),
      userVotes: undefined,
      myVote: comment.userVotes.find((vote) => vote.userId === ctx.user.id)?.choice,
    }))
  })
