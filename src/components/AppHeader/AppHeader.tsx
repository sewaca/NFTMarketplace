import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Tooltip,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { formatEther } from "ethers/lib/utils";
import { useState } from "react";
import { BigNumber } from "ethers";
import styles from "./AppHeader.module.css";
import { Link, useLocation } from "react-router-dom";

interface IAppHeaderProps {
  etherBalance: BigNumber | undefined;
  account: string | undefined;
  activateBrowserWallet: () => void;
  deactivate: () => void;
}

export default function AppHeader({
  etherBalance,
  account,
  activateBrowserWallet,
  deactivate,
}: IAppHeaderProps) {
  const [isMenuOpened, setIsMenuOpened] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const links = [
    { to: "/", title: "Торговая площадка", id: "marketplace" },
    { to: "/create", title: "Создать коллекцию", id: "createOwnCollection" },
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
                color={
                  location.pathname === link.to ? "text.secondary" : "primary"
                }
              >
                {link.title}
              </Typography>
            </Link>
          ))}
        </Box>
        <Box sx={{ ml: "auto" }}>
          {account ? (
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
                        sx={{ color: "primary.dark" }}
                      >
                        {parseFloat(formatEther(etherBalance))} ETH
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
    </AppBar>
  );
}
