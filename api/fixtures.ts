import mongoose from "mongoose";
import config from "./config";
import * as crypto from "crypto";
import User from "./Model/User";
import Posts from "./model/Posts";

const run = async () => {
	await mongoose.connect(config.db);
	const db = mongoose.connection;

	try {
		await db.dropCollection("users");
		await db.dropCollection("posts");
	} catch (e) {
		console.log("Collections were not present, skipping drop...");
	}

	const [user1, user2] = await User.create(
		{
			username: "Sasha",
			password: "12345",
			role: "user",
			token: crypto.randomUUID(),
			displayName: "Sany",
		},
		{
			username: "Bermet",
			password: "qwerty",
			role: "admin",
			token: crypto.randomUUID(),
			displayName: "Beka",
		}
	);
	await Posts.create(
		{
			author: user1.displayName,
			text: "some text",
		},
		{
			author: user1.displayName,
			text: "another text",
		},
		{
			author: user2.displayName,
			text: "hi",
		}
	);

	await db.close();
};

run().catch(console.error);
