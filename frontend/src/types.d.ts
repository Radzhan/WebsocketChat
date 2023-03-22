export interface ChatMessage {
  author: string;
  text: string;
}

export interface Post {
  _id: string;
  author: string;
  text: string;
}
export interface IncomingMessage {
  type: string;
  payload: ChatMessage;
}
export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
}
export interface User {
  _id: string;
  username: string;
  token: string;
  displayName: string;
  googleId: string | null;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _name: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}
