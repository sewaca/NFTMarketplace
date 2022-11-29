import { Menu, MenuItem, Typography } from "@mui/material";
import { formatEther } from "ethers/lib/utils";
import React from "react";
import { Link } from "react-router-dom";

interface HeaderMenuProps {
  balance: number | string;
  anchor: null | HTMLElement;
  onWalletQuit: Function;
  onAccountQuit: Function;
  onClose: Function;
}

export default function AccountMenu({
  anchor,
  balance,
  onWalletQuit,
  onClose,
  onAccountQuit,
}: HeaderMenuProps) {
  return (
    <Menu
      anchorEl={anchor}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={Boolean(anchor)}
      onClose={() => onClose()}
      sx={{ mt: 1 }}
    >
      <MenuItem>
        Баланс:
        <Typography
          component="span"
          sx={{ color: balance ? "primary.main" : "text.secondary", ml: "4px" }}
        >
          {balance ? balance + " ETH" : "скрыт"}
        </Typography>
      </MenuItem>
      <MenuItem>
        <Link to="/settings/" style={{ textDecoration: "unset" }}>
          <Typography color="white">Настройки</Typography>
        </Link>
      </MenuItem>
      <MenuItem onClick={() => onWalletQuit()}>
        <Typography>Выйти из кошелька</Typography>
      </MenuItem>
      <MenuItem onClick={() => onAccountQuit()}>
        <Typography sx={{ color: "#ea3b3b" }}>Выйти из аккаунта</Typography>
      </MenuItem>
    </Menu>
  );
}
