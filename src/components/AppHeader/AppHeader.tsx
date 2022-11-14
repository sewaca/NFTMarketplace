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
import { ReactNode, useState } from "react";

import LoginModal from "../LoginModal";
import RegistrationModal from "../RegistrationModal";
import { formatEther } from "ethers/lib/utils";
import styles from "./AppHeader.module.css";
import { useCookies } from "react-cookie";
import { useEtherBalance } from "@usedapp/core/dist/esm/src/hooks/useEtherBalance";
import { useEthers } from "@usedapp/core/dist/esm/src/hooks/useEthers";

// Hooks&functions:

interface IAppHeaderProps {
  limitedMode?: boolean;
}

export default function AppHeader({ limitedMode = false }: IAppHeaderProps) {
  const { account, activateBrowserWallet, deactivate } = useEthers();
  const etherBalance = useEtherBalance(account);
  const [isMenuOpened, setIsMenuOpened] = useState<null | HTMLElement>(null);
  const [modal, setModal] = useState<ReactNode | null>(null);
  const [, , removeLogin] = useCookies(["login"]);
  const location = useLocation();
  const links = limitedMode
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

  return (
    <AppBar color="default">
      <Toolbar variant="dense">
        <Box sx={{ display: "flex" }}>
          {links.map((link) => (
            <Link to={link.to} className={styles.AppHeader__Link} key={link.id}>
              <Typography
                variant="body1"
                className={styles.AppHeader__LinkText}
                color={location.pathname === link.to ? "grey.400" : "primary"}
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
                  onClick={(e) => setIsMenuOpened(e.currentTarget)}
                >
                  {account.slice(0, 5)}...{account.slice(-4)}
                </Button>
              </Tooltip>
              <Menu
                anchorEl={isMenuOpened}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                open={Boolean(isMenuOpened)}
                onClose={() => setIsMenuOpened(null)}
                sx={{ mt: 1 }}
              >
                <MenuItem>
                  <Typography>
                    Баланс:{" "}
                    {etherBalance ? (
                      <Typography
                        component="span"
                        sx={{ color: "primary.main" }}
                      >
                        {parseFloat(formatEther(etherBalance)).toFixed(4)} ETH
                      </Typography>
                    ) : (
                      <Typography
                        component="span"
                        sx={{ color: "text.secondary" }}
                      >
                        скрыт
                      </Typography>
                    )}
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <Typography>Личный кабинет</Typography>
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    deactivate();
                    setIsMenuOpened(null);
                    removeLogin("login");
                  }}
                >
                  <Typography>Выйти</Typography>
                </MenuItem>
              </Menu>
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
