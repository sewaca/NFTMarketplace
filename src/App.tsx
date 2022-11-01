import { Container, createTheme, ThemeProvider } from "@mui/material";
import { useEtherBalance, useEthers } from "@usedapp/core";
import AppHeader from "./components/AppHeader";
import Market from "./pages/Market";
import { Routes, Route, Link } from "react-router-dom";
import CreateNFT from "./pages/CreateNFT";

const NotCreated = ({ title }: { title: string }) => {
  console.log("rendered NotCreated");
  return (
    <>
      <h1> {title} </h1>
      <span>Страничка еще не готова.</span>
    </>
  );
};

const Error404 = () => {
  console.log("rendered Error404");
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
  },
});

function App() {
  console.log("rendered App");

  const { account, activateBrowserWallet, deactivate } = useEthers();
  const etherBalance = useEtherBalance(account);

  return (
    <ThemeProvider theme={theme}>
      <AppHeader
        etherBalance={etherBalance}
        account={account}
        activateBrowserWallet={activateBrowserWallet}
        deactivate={deactivate}
      />
      <Container sx={{ pt: 9, pb: 3 }}>
        <Routes>
          <Route path="/" element={<Market />} />
          <Route path="/create" element={<CreateNFT />} />
          <Route path="/my" element={<NotCreated title="Мои коллекции" />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
