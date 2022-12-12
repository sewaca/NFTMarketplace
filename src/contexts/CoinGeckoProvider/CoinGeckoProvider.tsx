import { useCoingeckoPrice } from "@usedapp/coingecko";
import { createContext, ReactNode, useEffect, useState } from "react";

interface CoinGeckoContextProps {
  children: ReactNode;
}

export const CoinPriceContext = createContext(0);

export default function CoinGeckoProvider({ children }: CoinGeckoContextProps) {
  const coinPrice = useCoingeckoPrice("ethereum", "usd");
  const [price, setPrice] = useState(0);
  useEffect(() => {
    setPrice(parseFloat(coinPrice || "0"));
  }, [coinPrice]);

  return (
    <CoinPriceContext.Provider value={price}>
      {children}
    </CoinPriceContext.Provider>
  );
}
