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
import styles from "./good-card.module.css";
import LikeButton from "./LikeButton";

interface GoodCardProps {
  good: {
    id: string;
    title: string;
    price: number;
    seller: {
      link: string;
      name: string;
    };
  };
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
          <Skeleton variant="rectangular" width={"100%"} height={160} />
        </CardMedia>
        <CardContent>
          <Typography variant="h6">
            {good.title} <LikeButton {...{ setIsLiked, isLiked }} />
          </Typography>
          <Typography variant="body1">
            Художник : <Link href={good.seller.link}>{good.seller.name}</Link>
          </Typography>
          <Typography variant="body1">
            Стоимость :{" "}
            <Typography component="span" color="primary.dark">
              {good.price}
            </Typography>{" "}
            ETH
            {coinPrice ? (
              <Typography component="span" color="secondary" sx={{ ml: 1 }}>
                ~{(good.price * coinPrice).toFixed(2)} $
              </Typography>
            ) : null}
          </Typography>
        </CardContent>
        <CardActions className={styles.Card__Actions}>
          <Button variant="contained" className={styles.Card__ActionButton}>
            Купить
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
