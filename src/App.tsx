import { Container, createTheme, ThemeProvider } from "@mui/material";
import { useEtherBalance, useEthers } from "@usedapp/core";
import AppHeader from "./components/AppHeader";
import Market from "./pages/Market";
import { Routes, Route, Link } from "react-router-dom";
import CreateNFT from "./pages/CreateNFT";
import { ReactNode } from "react";

const NotCreated = ({ title }: { title: string }) => {
  return (
    <>
      <h1> {title} </h1>
      <span>Страничка еще не готова.</span>
    </>
  );
};

const Error404 = () => {
  return (
    <>
      <h1>Ошибка 404</h1>
      <p>Страница не существует.</p>
      <Link to={"/"}>На главную</Link>
    </>
  );
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#ED720A",
      contrastText: "#fff",
      dark: "#d56402",
    },
    mode: "dark",
  },
});

function App() {
  const { account, activateBrowserWallet, deactivate } = useEthers();
  const etherBalance = useEtherBalance(account);

  const getDefaultLayout = (el: ReactNode) => (
    <>
      <AppHeader
        etherBalance={etherBalance}
        account={account}
        activateBrowserWallet={activateBrowserWallet}
        deactivate={deactivate}
      />
      <Container sx={{ pt: 9, pb: 3 }}>{el}</Container>
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={getDefaultLayout(<Market />)} />
        <Route path="/create" element={getDefaultLayout(<CreateNFT />)} />
        <Route
          path="/my"
          element={getDefaultLayout(<NotCreated title="Мои коллекции" />)}
        />
        <Route path="*" element={getDefaultLayout(<Error404 />)} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
