// Pages & Components :
import Collection from "./Collection";
import ErrorPage from "../ErrorPage";
import Loader from "../../components/Loader";
// Hooks
import { useCoingeckoPrice } from "@usedapp/coingecko";
import { useEthers } from "@usedapp/core";
import useApiRequest from "../../hooks/useApiRequest";
// Other
import API from "../../API/API";
import { ICollection } from "../../types";
// SLICK-CAROUSEL CSS FILES:
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slick_customization.css";

export default function MyNFTs() {
  const coinPrice = useCoingeckoPrice("ethereum", "usd");
  const { account } = useEthers();
  const { loading, error, data } = useApiRequest({
    request: API.getMyCollections({ account: account || "" }).then((res) =>
      res.json()
    ),
    key: "getCollections_" + account,
  });

  return loading ? (
    <Loader />
  ) : error ? (
    <ErrorPage errorCode="unavailable" />
  ) : (
    data.map((collection: ICollection) => (
      <Collection
        key={collection.id}
        {...{ collection }}
        coinPrice={coinPrice ? parseFloat(coinPrice) : 0}
      />
    ))
  );
}
