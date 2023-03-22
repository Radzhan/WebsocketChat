import express from "express";
import mongoose from "mongoose";
import Posts from "../model/Posts";

const PostsRouter = express.Router();

PostsRouter.get("/", async (req, res, next) => {
	try {
		const result = await Posts.find().limit(30);

		return res.send(result);
	} catch (e) {
		return next(e);
	}
});
export default PostsRouter;
