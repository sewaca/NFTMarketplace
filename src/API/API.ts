class API {
  url = "http://localhost:821";

  // GET /market?page=_&limit=_&nftAmount=_
  getMarket = async ({ page = 1, limit = 4, nftAmount = 10 }: IGetMarket) => {
    return fetch(
      this.url +
        `/market?` +
        new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          nftAmount: nftAmount.toString(),
        })
    );
  };

  // GET /market/:id
  getNft = async ({ id }: IGetNft) => {
    return fetch(this.url + `/market/` + id.toString());
  };

  // POST /buy/
  buyNft = async ({ userId, nftId }: IBuyNft) => {
    return fetch(this.url + `/buy`, {
      method: "POST",
      body: JSON.stringify({ userId, nftId }),
    });
  };

  // POST /makeNft/
  sendImage = async ({ nblocks, src, wallet, title }: ISendImageRequest) => {
    return fetch(this.url + "/makeNft/", {
      method: "POST",
      body: JSON.stringify({ nblocks, src, wallet, title }),
    });
  };

  // GET /getUserCollections/
  getMyCollections = async ({ login }: IGetMyCollections) => {
    return fetch(
      this.url + `/getUserCollections?` + new URLSearchParams({ login })
    );
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
    // PROD: Uncomment logic for login. Now in dev version it's commented
    return new Promise((resolve, reject) => {
      resolve({ json: () => ({ status: "ok" }) });
    });
    // return fetch(this.url + `/register/`, {
    //   method: "POST",
    //   body: JSON.stringify({ email, password }),
    // });
  };

  // POST /verifyWallet/
  verifyWallet = async ({ email, wallet }: IConnectWallet) => {
    return fetch(this.url + `/verifyWallet/`, {
      method: "POST",
      body: JSON.stringify({ email, wallet }),
    });
  };

  // GET /user/
  getUserInfo = async ({ login, fields }: IGetUser) => {
    return fetch(
      this.url +
        `/user?` +
        new URLSearchParams({ login, fields: JSON.stringify(fields) })
    );
  };

  // POST /like/
  likeNFT = async ({ login, nftId, liked }: ILikeNFT) => {
    return fetch(this.url + "/like/", {
      method: "POST",
      body: JSON.stringify({ login, nftId, liked }),
    });
  };
}

export default new API();

// Props interfaces for requests
interface IGetNft {
  id: number;
}
interface IGetMarket {
  page?: number;
  limit?: number;
  nftAmount?: number;
}
interface ISendImageRequest {
  nblocks: number;
  src: string;
  title: string;
  wallet: string;
}
interface IBuyNft {
  userId: string;
  nftId: string;
}
interface IGetMyCollections {
  login: string; // account id
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
interface IGetUser {
  login: string;
  fields: Array<"email" | "wallet" | "name" | "role" | "avatar">;
}
interface ILikeNFT {
  login: string;
  nftId: number;
  liked: boolean;
}
