// Pages & Components :
import ErrorPage from "../ErrorPage";
import Loader from "../../components/Loader";
// Hooks
import { useEthers } from "@usedapp/core";
import useApiRequest from "../../hooks/useApiRequest";
// Other
import API from "../../API/API";
import { ICollection } from "../../types";

import { CollectionByData } from "../../components/CollectionById";

export default function MyNFTs() {
  const { account } = useEthers();
  const { loading, error, data } = useApiRequest({
    request: () =>
      API.getMyCollections({ login: account || "" }).then((res) => res.json()),
    key: "getCollections_" + account,
  });

  return loading ? (
    <Loader />
  ) : error ? (
    <ErrorPage errorCode="unavailable" />
  ) : (
    data.map((collection: ICollection) => (
      <CollectionByData
        hideSeller
        hideLike
        key={collection.id}
        data={collection}
      />
    ))
  );
}
