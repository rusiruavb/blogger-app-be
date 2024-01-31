import { Blog } from "@prisma/client";
import prisma from "../../prisma/prisma.client";

export default class BlogService {
  async createBlogPost(blog: Blog) {
    try {
      return await prisma.$transaction(async (tx) => {
        blog.deletedAt = null;
        return await tx.blog.create({
          data: blog,
        });
      });
    } catch (error) {
      throw error;
    }
  }

  async getAllBlogPosts() {
    try {
      return await prisma.blog.findMany({
        where: {
          deletedAt: null,
        },
        select: {
          id: true,
          title: true,
          subTitle: true,
          content: true,
          thumbnail: true,
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          comments: {
            where: {
              deletedAt: null,
            },
            select: {
              id: true,
              comment: true,
              updatedAt: true,
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
          likes: {
            where: {
              deletedAt: null,
            },
            select: {
              id: true,
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getAllBlogPostById(blogId: string) {
    try {
      return await prisma.blog.findUnique({
        where: {
          id: blogId,
          deletedAt: null,
        },
        select: {
          id: true,
          title: true,
          subTitle: true,
          content: true,
          thumbnail: true,
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          comments: {
            where: {
              deletedAt: null,
            },
            select: {
              id: true,
              comment: true,
              updatedAt: true,
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
          likes: {
            where: {
              deletedAt: null,
            },
            select: {
              id: true,
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateBlogPost(blog: Blog) {
    try {
      return await prisma.$transaction(async (tx) => {
        return await tx.blog.update({
          where: {
            id: blog.id,
          },
          data: {
            title: blog.title,
            subTitle: blog.subTitle,
            content: blog.content,
            thumbnail: blog.thumbnail,
            tags: blog.tags,
          },
          select: {
            id: true,
            title: true,
            subTitle: true,
            content: true,
            thumbnail: true,
          },
        });
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteBlogPost(blogId: string) {
    try {
      await prisma.$transaction(async (tx) => {
        return await tx.blog.update({
          where: {
            id: blogId,
          },
          data: {
            deletedAt: new Date(),
          },
        });
      });

      return {
        message: "blog post deleted",
        timestamp: new Date(),
      };
    } catch (error) {
      throw error;
    }
  }
}
