import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
	author: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true
	}
});

const Posts = mongoose.model("Posts", postSchema);
export default Posts;
