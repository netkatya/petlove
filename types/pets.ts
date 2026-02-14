export type Category = "sell" | "free" | "lost" | "found";

export type Species =
  | "dog"
  | "cat"
  | "monkey"
  | "bird"
  | "snake"
  | "turtle"
  | "lizard"
  | "frog"
  | "fish"
  | "ants"
  | "bees"
  | "butterfly"
  | "spider"
  | "scorpion";

export type Sex = "unknown" | "female" | "male" | "multiple";

export type City = {
  _id: string;
  useCounty: string;
  stateEn: string;
  cityEn: string;
  countyEn: string;
};

export type PetsQueryParams = {
  keyword?: string;
  category?: Category;
  species?: Species;
  locationId?: string;

  byDate?: boolean;
  byPrice?: boolean;
  byPopularity?: boolean;

  page?: number;
  limit?: number;

  sex?: Sex;
};

export type Pet = {
  _id: string;
  species: Species;
  category: Category;
  price?: number;
  title: string;
  name: string;
  birthday: string;
  comment: string;
  sex: Sex;
  location: string;
  imgURL: string;
  createdAt: string;
  updatedAt?: string;
  user: string;
  popularity: number;
};

export type FetchPetsResponse = {
  page: number;
  perPage: number;
  totalPages: number;
  results: Pet[];
};

export type PetsFilters = {
  keyword?: string;
  category?: Category;
  sex?: Sex;
  species?: Species;
  locationId?: string;

  byPopularity?: boolean;
  byPrice?: boolean;
};

export type AddPetRequest = {
  name: string;
  title: string;
  imgURL: string;
  species: Species;
  birthday: string;
  sex: Sex;
};

export type AddPetResponse = {
  _id: string;
  name: string;
  title: string;
  imgURL: string;
  species: Species;
  birthday: string;
  sex: Sex;
  createdAt: string;
  updatedAt: string;
};

export type FavoritesResponse = string[];

export type NoticeDetails = {
  _id: string;
  species: Species;
  category: Category;
  price?: number;
  title: string;
  name: string;
  birthday: string;
  comment: string;
  sex: Sex;
  location: City;
  imgURL: string;
  createdAt: string;
  updatedAt?: string;
  user: {
    _id: string;
    email: string;
    phone?: string;
  };
  popularity: number;
};

export type GetNoticeResponse = NoticeDetails;

export type BaseNotice = {
  _id: string;
  title: string;
  name: string;
  birthday: string;
  sex: string;
  species: string;
  category: string;
  comment: string;
  price?: number | null;
  popularity: number;
  imgURL: string;
};

export type SelectOption = {
  value: Species;
  label: string;
};
