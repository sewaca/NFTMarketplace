import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { IUser } from "../../../types";
import styles from "./collectionInfo.module.css";

interface CollectionInfoProps {
  collection: {
    id: string;
    title: string;
    author: IUser;
    minPrice: number;
    lastBuy: string;
    available: number;
  };
  coinPrice: number;
}

export default function CollectionInfo({
  collection,
  coinPrice,
}: CollectionInfoProps) {
  return (
    <Box className={styles.Collection__Box}>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Коллекция "{collection.title}"
      </Typography>
      <div className={styles.Collection__infoBlock}>
        <Typography variant="body2">Автор:</Typography>
        <Link
          to={"/author/" + collection.author.id}
          className={styles.Collection__Link}
        >
          <Typography variant="body1">{collection.author.name}</Typography>
        </Link>
      </div>
      <div className={styles.Collection__infoBlock}>
        <Typography variant="body2">Минимальная цена:</Typography>
        <Typography variant="body1">
          {collection.minPrice} ETH{"  "}
          <Typography variant="body1" color="gray" component="span">
            ~{(coinPrice * collection.minPrice).toFixed(2)} $
          </Typography>
        </Typography>
      </div>
      <div className={styles.Collection__infoBlock}>
        <Typography variant="body2">Последняя покупка:</Typography>
        <Typography variant="body1">{collection.lastBuy}</Typography>
      </div>
      <div className={styles.Collection__infoBlock}>
        <Typography variant="body2">NFT доступных для покупки:</Typography>
        <Typography variant="body1">{collection.available}</Typography>
      </div>
    </Box>
  );
}
