import express from "express";
import userController from "./user/user.controller";
import blogController from "./blog/blog.controller";
import commentController from "./comment/comment.controller";
import likeController from "./like/like.controller";

const router = express.Router();

router.use("/user", userController);
router.use("/blog", blogController);
router.use("/comment", commentController);
router.use("/like", likeController);

export default router;
