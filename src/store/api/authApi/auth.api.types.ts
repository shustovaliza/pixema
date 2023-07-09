export interface CreateUserResponse {
  username: string;
  email: string;
  id: number;
}

export interface CreateUserPayload {
  username: string;
  password: string;
  email: string;
}

export interface ActivateEmailPayload {
  uid: string;
  token: string;
}

export interface ResendEmailPayload {
  email: string;
}