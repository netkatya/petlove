import { AddPetResponse, NoticeDetails } from "./pets";

export type UserNotice = {
  _id: string;
  species: string;
  category: string;
  title: string;
  name: string;
  birthday: string;
  comment: string;
  sex: string;
  location: string | { _id: string; stateEn: string; cityEn: string };
  imgURL: string;
  createdAt: string;
  updatedAt?: string;
  popularity: number;
};

export type UserPet = {
  _id: string;
  name: string;
  title: string;
  imgURL: string;
  species: string;
  birthday: string;
  sex: string;
  createdAt: string;
  updatedAt: string;
};

export type CurrentUserResponse = {
  _id: string;
  name: string;
  email: string;
  avatar?: string | null;
  phone?: string | null;
  token: string;
};

export type EditUserResponse = {
  _id: string;
  name: string;
  email: string;

  avatar?: string;
  phone?: string;

  token: string;

  noticesViewed: UserNotice[];
  noticesFavorites: UserNotice[];

  pets: UserPet[];

  createdAt: string;
  updatedAt: string;
};

export type EditUserRequest = {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
};

export type CurrentUserFullResponse = {
  _id: string;
  name: string;
  email: string;
  avatar?: string | null;
  phone?: string | null;
  token: string;

  pets: AddPetResponse[];
  noticesFavorites: NoticeDetails[];
  noticesViewed: NoticeDetails[];
};

export type ApiErrorResponse = {
  message?: string;
  error?: string;
};
