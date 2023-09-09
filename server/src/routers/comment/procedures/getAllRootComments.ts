import { Prisma } from '@prisma/client'
import { prisma, publicProcedure } from '@server/app'

const findCommentDto: Prisma.CommentSelect = {
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
  })
