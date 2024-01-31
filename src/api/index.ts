import express from "express";
import userController from "./user/user.controller";
import blogController from "./blog/blog.controller";
import commentController from "./comment/comment.controller";

const router = express.Router();

router.use("/user", userController);
router.use("/blog", blogController);
router.use("/comment", commentController);

export default router;
