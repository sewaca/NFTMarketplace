import ReactDOM from "react-dom/client";
import App from "./App";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { DAppProvider, Mainnet } from "@usedapp/core";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import "./global.css";
// Шрифты
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { hydrate } from "react-dom";


const config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    // [Mainnet.chainId]: getDefaultProvider("mainnet"),
    // [Goerli.chainId]: getDefaultProvider("goerli"),
  },
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#ED720A",
      contrastText: "#FFFFFF",
      dark: "#D56402",
    },
    secondary: {
      main: "#8809bb",
    },
    mode: "dark",
  },
});

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container);

const Application = () => (
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DAppProvider config={config}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          disableWindowBlurListener={true}
          autoHideDuration={2000}
          style={{ maxWidth: "calc(max(400px, 30vw))" }}
        >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SnackbarProvider>
      </DAppProvider>
    </ThemeProvider>
  </>
);

// react snap
if (document.getElementById("root")?.hasChildNodes()) {
  hydrate((<Application />) as any, document.getElementById("root"));
} else {
  root.render(<Application />);
}
