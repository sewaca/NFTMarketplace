import {
  createTheme,
  CssBaseline,
  StyledEngineProvider,
  ThemeOptions,
} from "@mui/material";
import App from "./App";
import { DAppProvider, Goerli } from "@usedapp/core";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@emotion/react";
// Static Data:
import MUITheme from "./data/MUITheme.json";
// React Contexts:
import { LoginProvider } from "./contexts/LoginContext";
import CoinGeckoProvider from "./contexts/CoinGeckoProvider";

// Config for UseDApp
const config = {
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [Goerli.chainId]:
      "https://goerli.infura.io/v3/56e4ee112dfe40bfafab1fdd7fac2b7e",
  },
  autoConnect: true,
};

// Theming for Material UI
// TODO: Починить default props для компонента Skeleton
const theme = createTheme(MUITheme as ThemeOptions);

export const AppProviders = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoginProvider>
        <DAppProvider config={config}>
          <CoinGeckoProvider>
            <StyledEngineProvider injectFirst>
              <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                disableWindowBlurListener={true}
                autoHideDuration={2000}
                preventDuplicate
                style={{ maxWidth: "calc(max(400px, 40vw))" }}
              >
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </SnackbarProvider>
            </StyledEngineProvider>
          </CoinGeckoProvider>
        </DAppProvider>
      </LoginProvider>
    </ThemeProvider>
  );
};
