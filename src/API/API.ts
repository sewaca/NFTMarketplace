class API {
  url = "http://localhost:821";


  

  // GET /market?page=_&limit=_
  async getMarket({ page = 1, limit = 30 }: IGetMarketProps) {
    return await fetch(this.url + `/market?page=${page}&limit=${limit}`);
  }

  // POST sendImage
  async sendImage({ nblocks, src }: ISendImageRequestProps) {
    return await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nblocks: nblocks,
        src: src,
      }),
    });
  }
}

export default new API();

interface IGetMarketProps {
  page?: number;
  limit?: number;
}
interface ISendImageRequestProps {
  nblocks: number;
  src: string;
}
