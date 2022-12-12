// Pages & Components :
import ErrorPage from "../ErrorPage";
import Loader from "../../components/Loader";
import { CollectionByData } from "../../components/CollectionById";
import { Typography } from "@mui/material";
// Hooks
import {
  ERC20Interface,
  useCall,
  useContractFunction,
  useEthers,
} from "@usedapp/core";
import { useEffect } from "react";
import { useApiRequest, useCheckBalance } from "../../hooks";
// Other
import API from "../../API/API";
import { ICollection } from "../../types";
import Button from "@mui/material/Button";
import { Contract, getDefaultProvider } from "ethers";
import interfce from "../../data/WethABI.json";
import { Interface } from "ethers/lib/utils";
import ABIjson from "../../data/WethABI.json";

export default function MyNFTs() {
  const { account } = useEthers();
  const { loading, error, data } = useApiRequest({
    request: () =>
      API.getMyCollections({ login: account || "" }).then((res) => res.json()),
    key: "getCollections_" + account,
  });

  const { state, send } = useCheckBalance();

  return loading ? (
    <Loader />
  ) : error ? (
    <ErrorPage errorCode="unavailable" />
  ) : (
    <>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Мои коллекции:
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>
        Всего NFT куплено:{" "}
        {state.data ? (
          <span>{state.data}</span>
        ) : (
          <Button onClick={(e) => send(account || "", 0)}>ПРОВЕРИТЬ</Button>
        )}
      </Typography>
      {data.map((collection: ICollection) => (
        <CollectionByData
          hideSeller
          hideLike
          key={collection.id}
          data={collection}
        />
      ))}
    </>
  );
}
