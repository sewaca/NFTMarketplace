import { Grid } from "@mui/material";
import { useCoingeckoPrice } from "@usedapp/coingecko";
import GoodCard from "./GoodCard";

interface MarketProps {}

type IProduct = {
  id: string;
  img: string; //base64
  title: string;
  price: number; // float
  seller: {
    link: string;
    name: string;
  };
};

const goods = new Array(10).fill(0).map(() => ({
  id: "id" + Math.random().toString(16).slice(2, 10),
  title: 'Картина "Прекрасное далеко"',
  price: parseFloat((Math.random() * 10).toFixed(3)), // ETH
  seller: {
    link: "#",
    name: "Andrey Andruha",
  },
}));

export default function Market({}: MarketProps) {
  const coinPrice = useCoingeckoPrice("ethereum", "usd");

  return (
    <Grid container spacing={2}>
      {goods.map((good) => (
        <GoodCard
          good={good}
          key={good.id}
          coinPrice={coinPrice ? parseFloat(coinPrice) : 0}
        />
      ))}
    </Grid>
  );
}
