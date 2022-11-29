// Layout :
import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { ReactNode, useContext, useState } from "react";
import LoginModal from "../LoginModal";
import RegistrationModal from "../RegistrationModal";
// Hooks :
import { useEtherBalance } from "@usedapp/core/dist/esm/src/hooks/useEtherBalance";
import { useEthers } from "@usedapp/core/dist/esm/src/hooks/useEthers";
// Other :
import { formatEther } from "ethers/lib/utils";
// CSS:
import styles from "./AppHeader.module.css";
import AccountMenu from "./AccountMenu";
import { LoginContext } from "../../AppProviders";

// Hooks&functions:

interface IAppHeaderProps {
  limitedMode?: boolean;
}

export default function AppHeader({ limitedMode = false }: IAppHeaderProps) {
  const { account, activateBrowserWallet, deactivate } = useEthers();
  const [, , removeLogin] = useContext(LoginContext);
  const etherBalance = useEtherBalance(account);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [modal, setModal] = useState<ReactNode | null>(null);
  const location = useLocation();
  // Ссылки в хедере
  let links = limitedMode
    ? [{ to: "/", title: "Торговая площадка", id: "marketplace" }]
    : [
        { to: "/", title: "Торговая площадка", id: "marketplace" },
        {
          to: "/create",
          title: "Создать коллекцию",
          id: "createOwnCollection",
        },
        { to: "/my", title: "Мои коллекции", id: "myCollection" },
      ];

  // Handlers:
  const onWalletQuit = () => {
    deactivate();
    setMenuAnchor(null);
  };
  const onAccountQuit = () => {
    deactivate();
    setMenuAnchor(null);
    removeLogin();
  };

  // TODO: Прибраться тут
  return (
    <AppBar>
      <Toolbar variant="dense">
        <Box sx={{ display: ["none", "flex"] }}>
          {links.map((link) => (
            <Link to={link.to} className={styles.AppHeader__Link} key={link.id}>
              <Typography
                variant="body1"
                className={styles.AppHeader__LinkText}
                color={location.pathname === link.to ? "grey.500" : "primary"}
              >
                {link.title}
              </Typography>
            </Link>
          ))}
        </Box>
        <Box sx={{ ml: "auto" }}>
          {limitedMode ? (
            <>
              <Button
                onClick={() =>
                  setModal(
                    <RegistrationModal closeHandler={() => setModal(null)} />
                  )
                }
                color="secondary"
                variant="outlined"
                sx={{ mr: 1 }}
              >
                Зарегистрироваться
              </Button>
              <Button
                onClick={() =>
                  setModal(<LoginModal closeHandler={() => setModal(null)} />)
                }
                color="primary"
                variant="outlined"
              >
                Войти
              </Button>
            </>
          ) : account ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Меню">
                <Button
                  variant="outlined"
                  onClick={(e) => setMenuAnchor(e.currentTarget)}
                >
                  {account.slice(0, 5)}...{account.slice(-4)}
                </Button>
              </Tooltip>
              <AccountMenu
                anchor={menuAnchor}
                balance={
                  etherBalance
                    ? parseFloat(formatEther(etherBalance)).toFixed(4)
                    : 0
                }
                onClose={() => setMenuAnchor(null)}
                onWalletQuit={onWalletQuit}
                onAccountQuit={onAccountQuit}
              />
            </Box>
          ) : (
            <Button
              onClick={() => activateBrowserWallet()}
              color="primary"
              variant="outlined"
            >
              Подключить аккаунт
            </Button>
          )}
        </Box>
      </Toolbar>
      {modal}
    </AppBar>
  );
}
