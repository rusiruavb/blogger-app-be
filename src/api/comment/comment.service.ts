import { Comment } from "@prisma/client";
import prisma from "../../prisma/prisma.client";

export default class CommentService {
  async addComment(comment: Comment) {
    try {
      return await prisma.$transaction(async (tx) => {
        comment.deletedAt = null;
        return await tx.comment.create({
          data: comment,
        });
      });
    } catch (error) {
      throw error;
    }
  }

  async updateComment(comment: Comment) {
    try {
      return await prisma.$transaction(async (tx) => {
        return await tx.comment.update({
          where: {
            id: comment.id,
          },
          data: {
            comment: comment.comment,
          },
          select: {
            id: true,
            comment: true,
            updatedAt: true,
          },
        });
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteComment(commentId: string) {
    try {
      await prisma.$transaction(async (tx) => {
        return await tx.comment.update({
          where: {
            id: commentId,
          },
          data: {
            deletedAt: new Date(),
          },
        });
      });

      return {
        message: "comment deleted",
        timestamp: new Date(),
      };
    } catch (error) {
      throw error;
    }
  }
}
