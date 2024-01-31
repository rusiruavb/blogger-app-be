import express, { NextFunction, Request, Response } from "express";
import CommentService from "./comment.service";
import { verifyToken } from "../../middleware/auth.middleware";

const router = express.Router();
const commentService = new CommentService();

router.post(
  "/",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await commentService.addComment(req.body);
      res.status(200).json(data);
    } catch (error: any) {
      next(error);
    }
  },
);

router.put(
  "/",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await commentService.updateComment(req.body);
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
      const data = await commentService.deleteComment(req.body.commentId);
      res.status(200).json(data);
    } catch (error: any) {
      next(error);
    }
  },
);

export default router;
