export type Friend = {
  _id: string;
  title: string;
  url: string;
  addressUrl: string;
  imageUrl: string;
  address: string;
  workDays: {
    _id: string;
    isOpen: boolean;
    from?: string;
    to?: string;
  }[];
  phone: string;
  email: string;
};

export type FetchFriendsResponse = Friend[];
