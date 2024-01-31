import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/prisma.client";

export default class UserService {
  async authenticateUser(username: string, password: string) {
    try {
      if (!username || !password) {
        throw new Error("Bad Request");
      }

      const user = await prisma.user.findUnique({
        where: {
          userName: username,
        },
        select: {
          id: true,
          password: true,
        },
      });

      console.log(user);

      if (!user?.id) {
        throw new Error("Unauthorized 1");
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        throw new Error("Unauthorized 2 ");
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" },
      );

      return { accessToken: token };
    } catch (error) {
      throw error;
    }
  }

  async createUserAccount(userData: User) {
    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          userName: userData.userName,
        },
      });

      if (existingUser) {
        throw new Error("User already exits");
      }

      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(userData.password, saltRounds);
      userData.password = hashPassword;

      return await prisma.user.create({
        data: userData,
        select: { id: true, createdAt: true },
      });
    } catch (error) {
      throw error;
    }
  }

  async getUser(userId: string) {
    try {
      return await prisma.user.findUnique({
        where: {
          id: userId,
          deletedAt: null,
        },
        select: {
          id: true,
          userName: true,
          firstName: true,
          lastName: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          password: false,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId: string, userData: User) {
    try {
      return await prisma.$transaction(async (tx) => {
        const user = await tx.user.findUnique({
          where: {
            id: userId,
          },
        });

        console.log(user);

        if (!user) {
          throw new Error("User not found");
        }

        if (userData.password.trim().length > 0) {
          const saltRounds = 10;
          const hashPassword = await bcrypt.hash(userData.password, saltRounds);
          userData.password = hashPassword;
        }

        return await tx.user.update({
          data: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password,
          },
          where: {
            id: user.id,
          },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            updatedAt: true,
          },
        });
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId: string) {
    try {
      await prisma.$transaction(async (tx) => {
        const user = await tx.user.findUnique({
          where: {
            id: userId,
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        await tx.blog.updateMany({
          where: {
            authorId: user.id,
          },
          data: {
            deletedAt: new Date(),
          },
        });

        await tx.comment.updateMany({
          where: {
            userId: user.id,
          },
          data: {
            deletedAt: new Date(),
          },
        });

        await tx.like.updateMany({
          where: {
            userId: user.id,
          },
          data: {
            deletedAt: new Date(),
          },
        });

        await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            deletedAt: new Date(),
          },
        });
      });

      return {
        message: "user account deleted",
        timestamp: new Date(),
      };
    } catch (error) {
      throw error;
    }
  }
}
