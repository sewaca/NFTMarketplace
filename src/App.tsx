// Layout (components & pages)
import { Container } from "@mui/material";
import AppHeader from "./components/AppHeader";
import ErrorPage from "./pages/ErrorPage";
import Market from "./pages/Market";
import MyNFTs from "./pages/MyNFTs";
import CreateNFT from "./pages/CreateNFT";
import Settings from "./pages/Settings";
import NFTPage from "./pages/NFTPage";
// other :
import { useEthers } from "@usedapp/core/dist/esm/src/hooks/useEthers";
import { Route, Routes } from "react-router-dom";
import { ReactNode, useContext } from "react";
import { LoginContext } from "./contexts/LoginContext";

type IGetDefaultLayoutProps = (
  el: ReactNode,
  onlyAuthorized?: boolean
) => ReactNode;

function App() {
  const { account } = useEthers();
  const [login] = useContext(LoginContext);
  let limitedMode: boolean = !login;

  const getDefaultLayout: IGetDefaultLayoutProps = (
    el,
    onlyAuthorized = false
  ) => (
    <>
      <AppHeader {...{ limitedMode }} />
      <Container sx={{ pt: 9, pb: 3 }}>
        {onlyAuthorized && (!account || !login) ? (
          <ErrorPage errorCode="requiredAuthorization" />
        ) : (
          el
        )}
      </Container>
    </>
  );

  // TODO: Сделать страницу юзера
  return (
    <Routes>
      <Route path="/" element={getDefaultLayout(<Market />)} />
      <Route path="/create/" element={getDefaultLayout(<CreateNFT />, true)} />
      <Route path="/my/" element={getDefaultLayout(<MyNFTs />, true)} />
      <Route path="/settings/" element={getDefaultLayout(<Settings />, true)} />
      <Route path="/nft/:id" element={getDefaultLayout(<NFTPage />, true)} />
      <Route
        path="*"
        element={getDefaultLayout(<ErrorPage errorCode="404" />)}
      />
    </Routes>
  );
}

export default App;
