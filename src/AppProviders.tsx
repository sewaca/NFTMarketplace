import { CssBaseline, StyledEngineProvider, createTheme } from "@mui/material";
import App from "./App";
import { DAppProvider, Goerli, Mainnet } from "@usedapp/core";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@emotion/react";
import { getDefaultProvider } from "ethers";

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
const theme = createTheme({
  palette: {
    primary: {
      main: "#FF003C",
      contrastText: "#FFFFFF",
      dark: "#CA0F3B",
    },
    secondary: {
      main: "#FFF700",
      contrastText: "#000000",
      dark: "#b6b000",
    },
    mode: "dark",
  },
  typography: {
    fontFamily: ["Space Grotesk", "Blender Pro", "Roboto", "sans-serif"].join(
      ","
    ),
    fontSize: 17,
    body2: {
      fontFamily: ["Blender Pro", "Space Grotesk", "Roboto", "sans-serif"].join(
        ","
      ),
      fontSize: 20,
      fontWeight: 600,
      lineHeight: 1,
    },
    h5: {
      fontFamily: ["Blender Pro", "Space Grotesk", "Roboto", "sans-serif"].join(
        ","
      ),
    },
    h6: {
      fontFamily: ["Blender Pro", "Space Grotesk", "Roboto", "sans-serif"].join(
        ","
      ),
    },
  },
  components: {
    MuiSkeleton: {
      defaultProps: {
        animation: "wave",
      },
    },
  },
});

export const AppProviders = () => {
  return (
    <>
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
    </>
  );
};
