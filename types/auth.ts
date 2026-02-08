export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  email: string;
  name: string;
  token: string;
};

export type CurrentUserResponse = {
  _id: string;
  name: string;
  email: string;
  avatar?: string | null;
  token: string;
};

export type EditUserRequest = {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
};

export type EditUserResponse = {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  token: string;
  noticesViewed: unknown[];
  noticesFavorites: unknown[];
  pets: unknown[];
  createdAt: string;
  updatedAt: string;
};

export type ApiErrorResponse = {
  message?: string;
  error?: string;
};
