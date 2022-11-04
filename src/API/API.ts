class API {
  url = "http://localhost:821";

  // GET /market/:id
  getNft = async ({ id }: IGetNftProps) => {
    return fetch(this.url + `/market/${id}`);
  };

  // GET /market?page=_&limit=_
  getMarket = async ({ page = 1, limit = 30 }: IGetMarketProps) => {
    return fetch(this.url + `/market?page=${page}&limit=${limit}`);
  };

  // POST sendImage
  sendImage = async ({ nblocks, src }: ISendImageRequestProps) => {
    return fetch(this.url, {
      method: "POST",
      body: JSON.stringify({ nblocks, src }),
    });
  };

  buyNft = async ({ userId, nftId }: IBuyNftProps) => {
    return fetch((this.url += `/buy`), {
      method: "POST",
      body: JSON.stringify({ userId, nftId }),
    });
  };
}

export default new API();

type INFTInfo = {
  id: string;
  img: string;
  title: string;
  price: number;
  collection: {
    title: string;
    link: string; // !mb id
  };
  seller: {
    link: string;
    name: string;
  };
};

interface IGetNftProps {
  id: number;
}
interface IGetMarketProps {
  page?: number;
  limit?: number;
}
interface ISendImageRequestProps {
  nblocks: number;
  src: string;
}
interface IBuyNftProps {
  userId: string;
  nftId: string;
}
