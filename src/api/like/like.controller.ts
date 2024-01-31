import express, { NextFunction, Request, Response } from "express";
import LikeService from "./like.service";
import { verifyToken } from "../../middleware/auth.middleware";

const router = express.Router();
const likeService = new LikeService();

router.post(
  "/",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await likeService.addLike(req.body);
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
      const data = await likeService.deleteLike(req.body.likeId);
      res.status(200).json(data);
    } catch (error: any) {
      next(error);
    }
  },
);

export default router;
