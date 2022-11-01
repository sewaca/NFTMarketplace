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
  IconButton,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";

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
      <Card sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
        <CardMedia>
          <Skeleton variant="rectangular" width={"100%"} height={160} />
        </CardMedia>
        <CardContent>
          <Typography variant="h6">{good.title}</Typography>
          <Typography variant="body1">
            Художник : <Link href={good.seller.link}>{good.seller.name}</Link>
          </Typography>
          <Typography variant="body1">
            Стоимость :{" "}
            <Typography component="span" sx={{ color: "primary.dark" }}>
              {good.price}
            </Typography>{" "}
            ETH{" "}
            {coinPrice ? (
              <span
                style={{ color: "#a4a4a4", fontWeight: 500, marginLeft: "5px" }}
              >
                ~{(good.price * coinPrice).toFixed(3)} $
              </span>
            ) : null}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Tooltip title="В избранное" placement="top">
            <IconButton onClick={() => setIsLiked(!isLiked)}>
              <FavoriteIcon color={isLiked ? "primary" : "inherit"} />
            </IconButton>
          </Tooltip>
          <Button variant="contained" color="primary">
            Купить
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
