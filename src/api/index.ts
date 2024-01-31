import express from "express";
import userController from "./user/user.controller";
import blogController from "./blog/blog.controller";

const router = express.Router();

router.use("/user", userController);
router.use("/blog", blogController);

export default router;
