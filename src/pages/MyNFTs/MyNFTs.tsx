import React from "react";
import API from "../../API/API";
import Loader from "../../components/Loader";
import useApiRequest from "../../hooks/useApiRequest";
import { ICollection } from "../../types";
import ErrorPage from "../ErrorPage";
import Collection from "./Collection";
import "./slick_customization.css";

interface MyNFTsProps {
  coinPrice: string | undefined;
  account: string | undefined;
}

export default function MyNFTs({ coinPrice, account }: MyNFTsProps) {
  account = account || "";
  const { loading, error, data } = useApiRequest({
    request: API.getMyCollections({ account: account }).then((res) =>
      res.json()
    ),
    key: "getCollections_" + account,
  });
  return loading ? (
    <Loader />
  ) : error ? (
    <ErrorPage errorCode="requiredAuthorization"/>
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
