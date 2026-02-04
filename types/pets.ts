type Category = "sell" | "free" | "lost" | "found";

type Species =
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

type Sex = "unknown" | "female" | "male" | "multiple";

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
