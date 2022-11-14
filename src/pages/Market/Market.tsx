// Components & Pages
import { Grid } from "@mui/material";
import Loader from "../../components/Loader";
import GoodCard from "./GoodCard";
import ErrorPage from "../ErrorPage";
// Hooks: 
import useApiRequest from "../../hooks/useApiRequest";
import { useCoingeckoPrice } from "@usedapp/coingecko";
import { useState } from "react";
// Other :  
import API from "../../API/API";
import { INFT } from "../../types";

const perPage = 12;
export default function Market() {
  const [page, setPage] = useState(1);
  const coinPrice = useCoingeckoPrice("ethereum", "usd");

  const { loading, data, error } = useApiRequest({
    request: API.getMarket({ page, limit: perPage }).then((res) => res.json()),
    key: "getMarket_page=" + page + "&limit=" + perPage,
  });

  return loading ? (
    <Loader />
  ) : error ? (
    <ErrorPage errorCode="unavailable" />
  ) : (
    <Grid container spacing={2}>
      {data.map((good: INFT) => (
        <GoodCard
          good={good}
          key={good.id}
          coinPrice={coinPrice ? parseFloat(coinPrice) : 0}
        />
      ))}
    </Grid>
  );
}
