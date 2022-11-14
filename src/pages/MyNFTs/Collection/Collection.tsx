import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./collection.module.css";
import NftInfo from "./NftInfo";
import Slider from "react-slick";
import { ICollection, INFT } from "../../../types";

interface CollectionProps {
  collection: ICollection;
  coinPrice: number;
}

let collectionInfoRowStyles = {
  marginBottom: 6,
};

export default function Collection({ collection, coinPrice }: CollectionProps) {
  return (
    <Grid
      container
      sx={{ mb: 5 }}
      spacing={3}
      className={styles.CollectionInfo__Row}
    >
      <Grid item md={4}>
        <Box className={styles.CollectionInfo__Main}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Коллекция "{collection.title}"
          </Typography>
          <div style={collectionInfoRowStyles}>
            <Typography variant="body2">Автор:</Typography>
            <Link
              to={"/author/" + collection.author.id}
              style={{
                color: "var(--primary-dark)",
                textDecoration: "none",
              }}
            >
              <Typography variant="body1">{collection.author.name}</Typography>
            </Link>
          </div>
          <div style={collectionInfoRowStyles}>
            <Typography variant="body2">Минимальная цена:</Typography>
            <Typography variant="body1">
              {collection.minPrice} ETH{"  "}
              <Typography variant="body1" color="gray" component="span">
                ~{(coinPrice * collection.minPrice).toFixed(2)} $
              </Typography>
            </Typography>
          </div>
          <div style={collectionInfoRowStyles}>
            <Typography variant="body2">Последняя покупка:</Typography>
            <Typography variant="body1">{collection.lastBuy}</Typography>
          </div>
          <div style={collectionInfoRowStyles}>
            <Typography variant="body2">NFT доступных для покупки:</Typography>
            <Typography variant="body1">{collection.available}</Typography>
          </div>
        </Box>
      </Grid>
      <Grid item md={8}>
        <div style={{ height: "100%", padding: "0" }}>
          <Slider
            variableWidth
            adaptiveHeight
            infinite={false}
            arrows={false}
            dots={true}
            dotsClass={"SliderDots"}
          >
            {collection.bought.map((nft: INFT) => (
              <NftInfo
                {...{ nft }}
                key={Math.random().toString(16).slice(2, 10)}
              />
            ))}
          </Slider>
        </div>
      </Grid>
    </Grid>
  );
}
