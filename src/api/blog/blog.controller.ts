import express, { NextFunction, Request, Response } from "express";
import BlogService from "./blog.service";
import { verifyToken } from "../../middleware/auth.middleware";

const router = express.Router();
const blogService = new BlogService();

router.post(
  "/",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await blogService.createBlogPost(req.body);
      res.status(200).json(data);
    } catch (error: any) {
      next(error);
    }
  },
);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await blogService.getAllBlogPosts();
    res.status(200).json(data);
  } catch (error: any) {
    next(error);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await blogService.getAllBlogPostById(req.params.id);
    res.status(200).json(data);
  } catch (error: any) {
    next(error);
  }
});

router.put(
  "/",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await blogService.updateBlogPost(req.body);
      res.status(200).json(data);
    } catch (error: any) {
      next(error);
    }
  },
);

router.delete(
  "/",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await blogService.deleteBlogPost(req.body.blogId);
      res.status(200).json(data);
    } catch (error: any) {
      next(error);
    }
  },
);

export default router;
