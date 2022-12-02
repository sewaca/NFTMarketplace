import { Grid } from "@mui/material";
import { useCoingeckoPrice } from "@usedapp/coingecko";
import Slider from "react-slick";
import { ICollection } from "../../types";
import { NFTById } from "../NFTById";
import styles from "./collection.module.css";
import CollectionInfo from "./CollectionInfo";
import LazyLoad from "react-lazyload";

interface CollectionByIdProps {
  hideSeller?: boolean;
  hideLike?: boolean;
}

// TODO: Написать request и компонент CollectionById
export function CollectionById({ hideSeller, hideLike }: CollectionByIdProps) {
  return <></>;
}

interface CollectionByDataProps {
  data: ICollection;
  hideSeller?: boolean;
  hideLike?: boolean;
}
export function CollectionByData({
  data,
  hideSeller,
  hideLike,
}: CollectionByDataProps) {
  const coinPrice = useCoingeckoPrice("ethereum", "usd");
  let collectionInfo = {
    id: data.id,
    title: data.title,
    author: data.author,
    minPrice: data.minPrice,
    lastBuy: data.lastBuy,
    available: data.available,
  };

  return (
    <Grid container sx={{ mb: 5 }} spacing={3}>
      <Grid item xs={12} md={4}>
        <CollectionInfo
          collection={collectionInfo}
          coinPrice={parseFloat(coinPrice || "0")}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <Slider
          variableWidth
          adaptiveHeight
          infinite={false}
          arrows={false}
          dots={true}
          dotsClass={"SliderDots"}
        >
          {data.nfts.map((id: number) => (
            <div className={styles.CollectionInfo__NFTWrapper} key={id}>
              <LazyLoad>
                <NFTById
                  {...{ id, hideSeller, hideLike }}
                  coinPrice={parseFloat(coinPrice || "0")}
                />
              </LazyLoad>
            </div>
          ))}
        </Slider>
      </Grid>
    </Grid>
  );
}
