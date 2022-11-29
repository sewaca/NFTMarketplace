// Components & Pages
import { Typography } from "@mui/material";
import Loader from "../../components/Loader";
import ErrorPage from "../ErrorPage";
// Hooks:
import useApiRequest from "../../hooks/useApiRequest";
import { useState } from "react";
// Other :
import API from "../../API/API";
import { ICollection } from "../../types";
import { CollectionByData } from "../../components/CollectionById";

const perPage = 3;
export default function Market() {
  const [page, setPage] = useState(1);

  const { loading, data, error } = useApiRequest({
    request: () =>
      API.getMarket({ page, limit: perPage, nftAmount: 10 }).then((res) =>
        res.json()
      ),
    key: "getMarket_page=" + page + "&limit=" + perPage,
  });

  return (
    <>
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
        Маркетплейс:
      </Typography>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorPage errorCode="unavailable" />
      ) : (
        data.map((collection: ICollection) => (
          <CollectionByData data={collection} />
        ))
      )}
    </>
  );
}
