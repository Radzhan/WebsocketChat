import React, {useCallback, useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import Sidebar from "../../components/Sidebar/Sidebar";
import {selectUser} from "../../features/user/userSlice";
import {getPosts, Posts} from "../../store/chatSlice";
import {ChatMessage, IncomingMessage} from "../../types";

const Chat = () => {
	const user = useAppSelector(selectUser);
	const posts = useAppSelector(Posts);
	const dispatch = useAppDispatch();
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [messageText, setMessageText] = useState("");

	const postsArray = useCallback(async () => {
		dispatch(getPosts);
		setMessages(posts);
	}, [dispatch, posts]);

	useEffect(() => {
		postsArray().catch(console.error);
	}, [postsArray]);

	const ws = useRef<WebSocket | null>(null);

	const Connect = useCallback(() => {
		ws.current = new WebSocket("ws://localhost:8000/chat");

		ws.current!.onclose = (e) => {
			console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
			setTimeout(function() {
				Connect();
			}, 2000);
		};

		ws.current!.onmessage = (event) => {
			const decodedMessage = JSON.parse(event.data) as IncomingMessage;

			if (decodedMessage.type === "NEW_MESSAGE") {
				setMessages((messages) => [...messages, decodedMessage.payload]);
			}
		};

		return () => {
			if (ws.current) {
				ws.current!.close();
			}
		};
	}, []);

	useEffect(() => {
		Connect();
	}, [Connect]);

	const changeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMessageText(e.target.value);
	};

	const sendMessage = (e: React.FormEvent) => {
		e.preventDefault();

		if (!ws.current) return;

		ws.current!.send(
			JSON.stringify({
				type: "SEND_MESSAGE",
				payload: {
					name: user?.displayName,
					text: messageText,
				},
			})
		);
	};

	let chat = (
		<div>
			{messages.map((message, idx) => (
				<div key={idx}>
					<b>{message.author}: </b>
					{message.text}
				</div>
			))}
			<form onSubmit={sendMessage}>
				<input
					type="text"
					name="messageText"
					value={messageText}
					onChange={changeMessage}
				/>
				<input type="submit" value="Send"/>
			</form>
		</div>
	);

	return (
		<div className="App">
			<Sidebar/>
			{chat}
		</div>
	);
};

export default Chat;
