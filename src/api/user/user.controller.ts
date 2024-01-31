import express, { NextFunction, Request, Response } from "express";
import UserService from "./user.service";
import { verifyToken } from "../../middleware/auth.middleware";

const router = express.Router();
const userService = new UserService();

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await userService.authenticateUser(
        req.body.userName,
        req.body.password,
      );
      res.status(200).json(data);
    } catch (error: any) {
      next(error);
    }
  },
);

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await userService.createUserAccount(req.body);
    res.status(200).json({ data: data });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await userService.getUser(req.body.userId);
      res.status(200).json({ data: data });
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  "/",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await userService.updateUser(req.body.userId, req.body);
      res.status(200).json({ data: data });
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await userService.deleteUser(req.body.userId);
      res.status(200).json({ data: data });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
