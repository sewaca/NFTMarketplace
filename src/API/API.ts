class API {
  // url = "http://localhost:821";
  url = "http://localhost:8080";

  // GET /market?page=_&limit=_
  getMarket = async ({ page = 1, limit = 30 }: IGetMarketProps) => {
    return fetch(this.url + `/market?page=${page}&limit=${limit}`);
  };

  // GET /market/:id
  getNft = async ({ id }: IGetNftProps) => {
    return fetch(this.url + `/market/${id}`);
  };

  // POST /buy/
  buyNft = async ({ userId, nftId }: IBuyNftProps) => {
    return fetch(this.url + `/buy`, {
      method: "POST",
      body: JSON.stringify({ userId, nftId }),
    });
  };

  // POST /makeNft/
  sendImage = async ({
    nblocks,
    src,
    wallet,
    title,
  }: ISendImageRequestProps) => {
    return fetch(this.url + "/makeNft/", {
      method: "POST",
      body: JSON.stringify({ nblocks, src, wallet, title }),
    });
  };

  // GET /getUserCollection/
  getMyCollections = async ({ account }: IGetMyCollections) => {
    return fetch(this.url + `/getUserCollections?account=${account}`, {});
  };

  // POST /register/
  registerUser = async ({ email, password }: IPostNewUser) => {
    return fetch(this.url + `/register/`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  };

  // POST /login/
  loginUser = async ({ email, password }: ILoginUser) => {
    return fetch(this.url + `/register/`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  };

  // PUT /connectWallet/
  connectWallet = async ({ email, wallet }: IConnectWallet) => {
    return fetch(this.url + `/connectWallet/`, {
      method: "PUT",
      body: JSON.stringify({ email, wallet }),
    });
  };
}

export default new API();

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
  title: string;
  wallet: string;
}
interface IBuyNftProps {
  userId: string;
  nftId: string;
}
interface IGetMyCollections {
  account: string; // account id
}
interface IPostNewUser {
  email: string;
  password: string;
}
interface ILoginUser {
  email: string;
  password: string;
}
interface IConnectWallet {
  email: string;
  wallet: string;
}
