export type IUser = {
  id: number;
  name: string;
};

export type INFT = {
  id: string;
  img: string;
  title: string;
  price: number;
  collection: {
    id: string;
    title: string;
    author: IUser;
  };
  liked: boolean;
  seller: IUser;
};

export type ICollection = {
  id: string;
  title: string;
  author: IUser;
  minPrice: number;
  lastBuy: string;
  available: number;
  nfts: Array<number>;
};
