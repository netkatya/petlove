export type FetchNewsParams = {
  keyword?: string;
  page?: number;
  limit?: number;
};

export type NewsItem = {
  _id: string;
  imgUrl: string;
  title: string;
  text: string;
  date: string;
  url: string;
};

export type FetchNewsResponse = {
  page: number;
  perPage: number;
  totalPages: number;
  results: NewsItem[];
};
