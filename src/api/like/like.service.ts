import { Like } from "@prisma/client";
import prisma from "../../prisma/prisma.client";

export default class LikeService {
  async addLike(like: Like) {
    try {
      return await prisma.$transaction(async (tx) => {
        const userBlogLike = await tx.like.findFirst({
          where: {
            blogId: like.blogId,
            userId: like.userId,
          },
        });

        if (userBlogLike) {
          return userBlogLike;
        }

        like.deletedAt = null;
        return await tx.like.create({
          data: like,
        });
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteLike(likeId: string) {
    try {
      await prisma.$transaction(async (tx) => {
        return await tx.like.delete({
          where: {
            id: likeId,
          },
        });
      });

      return {
        message: "like deleted",
        timestamp: new Date(),
      };
    } catch (error) {
      throw error;
    }
  }
}
