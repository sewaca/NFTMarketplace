import {
  Grid,
  Card,
  CardMedia,
  Skeleton,
  CardContent,
  Typography,
  Link,
  CardActions,
  Button,
} from "@mui/material";
import { useState } from "react";
import { INFT } from "../../../types";
import styles from "./good-card.module.css";
import LikeButton from "./LikeButton";

interface GoodCardProps {
  good: INFT;
  coinPrice: number;
}

export default function GoodCard({ good, coinPrice }: GoodCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        className={styles.Card}
        sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
      >
        <CardMedia>
          {good.img ? (
            <div style={{ width: "100%", height: 160, display: "flex" }}>
              <img
                src={good.img}
                style={{ height: "100%", margin: "auto" }}
                alt={good.title}
              />
            </div>
          ) : (
            <Skeleton variant="rectangular" width={"100%"} height={160} />
          )}
        </CardMedia>
        <CardContent>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">{good.title}</Typography>
            <LikeButton {...{ setIsLiked, isLiked }} />
          </div>
          <Typography variant="body1">
            Художник:{" "}
            <Link
              href={"/users/" + good.seller.id}
              sx={{ color: "primary.main" }}
            >
              {good.seller.name}
            </Link>
          </Typography>
          <Typography variant="body1">
            Стоимость:{" "}
            <Typography component="span" sx={{ color: "primary.main" }}>
              {good.price} ETH
            </Typography>
            {coinPrice ? (
              <Typography component="span" sx={{ color: "grey.400", ml: 1 }}>
                ~{(good.price * coinPrice).toFixed(2)} $
              </Typography>
            ) : null}
          </Typography>
        </CardContent>
        <CardActions className={styles.Card__Actions}>
          <Button
            variant="contained"
            sx={{
              background: `linear-gradient(35deg, var(--secondary-main) 13%, var(--primary-main) 75%)`,
              "&::after": {
                content: "''",
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                transition: ".3s",
                background: "rgba(0,0,0,0.4)",
                opacity: 0,
                zIndex: 0,
              },
              "&:hover::after": {
                opacity: 1,
              },
            }}
            className={styles.Card__ActionButton}
          >
            <Typography variant="body1" sx={{ zIndex: 1 }}>
              Подробнее
            </Typography>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
