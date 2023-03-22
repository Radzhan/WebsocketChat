import {WebSocket} from 'ws';

export interface ActiveConnections {
	[id: string]: WebSocket
}

export interface Message {
	name: string;
	text: string;
}

export interface IncomingMessage {
	type: string;
	payload: Message;
}

export interface IUser {
	username: string;
	password: string;
	token: string;
	displayName: string;
	googleId?: string;
}