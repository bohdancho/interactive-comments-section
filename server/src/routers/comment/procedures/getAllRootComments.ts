import { prisma, publicProcedure } from '@server/app'

const findCommentDto = {
  id: true,
  createdAt: true,
  body: true,
  author: true,
  rating: true,
}

export const getAllRootComments = () =>
  publicProcedure.query(() => {
    return prisma.comment.findMany({
      where: { rootComment: null },
      select: {
        ...findCommentDto,
        replies: {
          select: { ...findCommentDto },
        },
      },
    })
  })
