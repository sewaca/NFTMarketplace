import {
  CssBaseline,
  StyledEngineProvider,
  createTheme,
  ThemeOptions,
} from "@mui/material";
import App from "./App";
import { DAppProvider, Goerli, Mainnet } from "@usedapp/core";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@emotion/react";
import { getDefaultProvider } from "ethers";
import MUITheme from "./data/MUITheme.json";
import { LoginProvider } from "./contexts/LoginContext";

// Config for UseDApp
const config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    // [Mainnet.chainId]: getDefaultProvider("mainnet"),
    // [Goerli.chainId]: getDefaultProvider("goerli"),
  },
  autoConnect: true,
};
// Theming for Material UI
const theme = createTheme(MUITheme as ThemeOptions);

export const AppProviders = () => {
  return (
    <LoginProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DAppProvider config={config}>
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
        </DAppProvider>
      </ThemeProvider>
    </LoginProvider>
  );
};
