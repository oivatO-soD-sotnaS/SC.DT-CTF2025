export interface User {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  created_at: string;
}

export interface Message {
  id: number;
  user_id: number;
  username: string;
  content: string;
  created_at: string;
}

export interface CreateUserData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface CreateMessageData {
  content: string;
}

