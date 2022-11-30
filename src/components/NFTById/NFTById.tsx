// Layout
import {
  Card,
  CardMedia,
  Skeleton,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
// Hooks:
import useApiRequest from "../../hooks/useApiRequest";
// Other:
import { INFT } from "../../types";
import API from "../../API/API";
// CSS:
import styles from "./NftById.module.css";
import LikeButton from "./LikeButton";
import ErrorPage from "../../pages/ErrorPage";

interface NFTByIdProps {
  id: number;
  hideSeller?: boolean;
  hideLike?: boolean;
  coinPrice?: number | undefined;
}

export function NFTById({
  id,
  hideSeller = false,
  hideLike = false,
  coinPrice = undefined,
}: NFTByIdProps) {
  const { data, loading, error } = useApiRequest({
    request: () => API.getNft({ id }).then((res) => res.json()),
    key: "getting_nft_id=" + id,
  });

  return error ? (
    <ErrorPage errorCode="unavailable" />
  ) : (
    <NFT {...{ data, loading, hideSeller, hideLike, coinPrice }} />
  );
}

interface NFTProps {
  data: INFT;
  loading?: boolean;
  hideSeller?: boolean;
  hideLike?: boolean;
  coinPrice?: number | undefined;
}

// BUG: card is "jumping", when you interact with it
export function NFT({
  data,
  loading = false,
  hideSeller = false,
  hideLike = false,
  coinPrice = undefined,
}: NFTProps) {
  return (
    <Card className={styles.NFTInfoCard}>
      <Link
        to={"/nft/" + (data.id || 0)}
        className={styles.NFTInfoCard__Link}
      />
      <CardMedia sx={{ px: 0, mx: 0 }}>
        {!loading && data.img ? (
          <div className={styles.NFT__ImageBlock}>
            <img src={data.img} className={styles.NFT__Image} alt="" />
          </div>
        ) : (
          <Skeleton variant="rectangular" width={"100%"} height={240} />
        )}
      </CardMedia>
      <CardContent sx={{ textAlign: "left", px: 2, pt: 2 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {loading ? (
            <Skeleton sx={{ width: 150 }} />
          ) : (
            <Typography variant="h6">{data.title.slice(0, 23)}</Typography>
          )}
          {!hideLike && <LikeButton liked={data.liked} />}
        </div>

        {!hideSeller &&
          (loading ? (
            <Skeleton />
          ) : (
            <Typography variant="body1">
              Продавец:{" "}
              <Link
                to={"/users/" + data.seller.id}
                style={{
                  color: "var(--primary-main)",
                  zIndex: 5,
                  position: "relative",
                  fontWeight: 300,
                }}
              >
                {data.seller.name.slice(0, 20)}
              </Link>
            </Typography>
          ))}

        {loading ? (
          <Skeleton />
        ) : (
          <Typography variant="body1">
            Стоимость:{" "}
            <>
              <Typography component="span" sx={{ color: "primary.main" }}>
                {data.price} ETH
              </Typography>
              {coinPrice ? (
                <Typography component="span" sx={{ color: "grey.400", ml: 1 }}>
                  ~{(data.price * coinPrice).toFixed(2)} $
                </Typography>
              ) : null}
            </>
          </Typography>
        )}
      </CardContent>
      <CardActions className={styles.Card__Actions}>
        <Button variant="contained" className={styles.Card__ActionButton}>
          <Typography variant="body1">Подробнее</Typography>
        </Button>
      </CardActions>
    </Card>
  );
}
