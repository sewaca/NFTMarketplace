import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";
import { useCoingeckoPrice } from "@usedapp/coingecko";
import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import API from "../../API/API";
import useApiRequest from "../../hooks/useApiRequest";
import ErrorPage from "../ErrorPage";
import styles from "./nft-page.module.css";

interface NFTPageProps {}

export default function NFTPage({}: NFTPageProps) {
  // Параметр id берется из url строки
  let { id } = useParams();
  const { loading, data, error } = useApiRequest({
    request: () =>
      API.getNft({ id: parseInt(id || "", 16) }).then((res) => res.json()),
    key: `get_nft_${parseInt(id || "", 16)}`,
  });
  const coinPrice = useCoingeckoPrice("ethereum", "usd");

  return isNaN(parseInt(id || "", 16)) ? (
    <ErrorPage errorCode="404" />
  ) : (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6} lg={8} className={styles.NFTPage__ImageBlock}>
        {loading ? (
          <Skeleton sx={{ width: "100%", height: 300 }} variant="rectangular" />
        ) : (
          <img src={data.img} width={"100%"} />
        )}
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        {loading ? (
          <Skeleton height={40} />
        ) : (
          <Typography variant="h5">{data.title}</Typography>
        )}
        <div className={styles.NFTPage__InfoBlock}>
          {loading ? (
            <Skeleton />
          ) : (
            <Typography>
              Коллекция:{" "}
              <Link
                to={"/collection/" + data.collection.id}
                className={styles.InfoBlock__Link}
              >
                {data.collection.title}
              </Link>
            </Typography>
          )}
          {loading ? (
            <Skeleton />
          ) : (
            <Typography>
              Автор:{" "}
              <Link
                to={"/user/" + data.collection.author.id}
                className={styles.InfoBlock__Link}
              >
                {data.collection.author.name}
              </Link>
            </Typography>
          )}
        </div>
        <div className={styles.NFTPage__InfoBlock}>
          {loading ? (
            <Skeleton />
          ) : (
            <Typography>
              Продавец:{" "}
              <Link
                to={"/user/" + data.seller.id}
                className={styles.InfoBlock__Link}
              >
                {data.seller.name}
              </Link>
            </Typography>
          )}
        </div>
        <div className={styles.NFTPage__InfoBlock}>
          {loading ? (
            <>
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            <>
              <Typography>Цена:</Typography>
              <Typography variant="body2" color="secondary" fontSize={24}>
                {data.price} ETH{" "}
                {coinPrice && (
                  <Typography
                    component="span"
                    sx={{ display: "inline", color: "grey.400" }}
                  >
                    ~{" "}
                    {(parseFloat(coinPrice) * parseFloat(data.price)).toFixed(
                      2
                    )}{" "}
                    $
                  </Typography>
                )}
              </Typography>
            </>
          )}
        </div>
        <div className={styles.NFTPage__InfoBlock}>
          {loading ? (
            <Skeleton variant="rounded" width={260} height={50} />
          ) : (
            <Button variant="contained" sx={{ minWidth: 260 }}>
              КУПИТЬ
            </Button>
          )}
        </div>
      </Grid>
    </Grid>
  );
}
