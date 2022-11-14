import { Grid } from "@mui/material";
import { useState } from "react";
import API from "../../API/API";
import Loader from "../../components/Loader";
import useApiRequest from "../../hooks/useApiRequest";
import { INFT } from "../../types";
import ErrorPage from "../ErrorPage";
import GoodCard from "./GoodCard";

const perPage = 12;

interface MarketProps {
  coinPrice: string | undefined;
}
export default function Market({ coinPrice }: MarketProps) {
  const [page, setPage] = useState(1);

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
