import { prisma, publicProcedure } from '@server/app'

export const getAllRootComments = () =>
  publicProcedure.query(async ({ ctx }) => {
    const comments = await prisma.comment.findMany({
      where: { rootComment: null },
      select: {
        id: true,
        createdAt: true,
        body: true,
        author: true,
        rating: true,
        userVotes: true,
        replies: {
          select: {
            id: true,
            createdAt: true,
            body: true,
            author: true,
            rating: true,
            userVotes: true,
          },
        },
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
