import {
  Button,
  Container,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useEtherBalance, useEthers } from "@usedapp/core";
import AppHeader from "./components/AppHeader";
import Market from "./pages/Market";
import { Routes, Route, Link } from "react-router-dom";
import CreateNFT from "./pages/CreateNFT";
import { ReactNode } from "react";
import MyNFTs from "./pages/MyNFTs";
import { useCoingeckoPrice } from "@usedapp/coingecko";
import { useCookies } from "react-cookie";
import ErrorPage from "./pages/ErrorPage";

type IGetDefaultLayoutProps = (
  el: ReactNode,
  onlyAuthorized?: boolean
) => ReactNode;

function App() {
  const { account, activateBrowserWallet, deactivate } = useEthers();
  const etherBalance = useEtherBalance(account);
  const coinPrice = useCoingeckoPrice("ethereum", "usd");
  const [{ login }, setLogin] = useCookies(["login"]);
  let limitedMode = !login;

  const getDefaultLayout: IGetDefaultLayoutProps = (
    el,
    onlyAuthorized = false
  ) => (
    <>
      <AppHeader
        {...{
          etherBalance,
          account,
          activateBrowserWallet,
          deactivate,
          limitedMode,
        }}
      />
      <Container sx={{ pt: 9, pb: 3 }}>
        {onlyAuthorized && !account ? (
          <ErrorPage errorCode="requiredAuthorization" />
        ) : (
          el
        )}
      </Container>
    </>
  );

  return (
    <Routes>
      <Route
        path="/"
        element={getDefaultLayout(<Market coinPrice={coinPrice} />)}
      />
      <Route path="/create" element={getDefaultLayout(<CreateNFT />)} />
      <Route
        path="/my"
        element={getDefaultLayout(
          <MyNFTs account={account} coinPrice={coinPrice} />,
          true
        )}
      />
      <Route
        path="*"
        element={getDefaultLayout(<ErrorPage errorCode="404" />)}
      />
    </Routes>
  );
}

export default App;
