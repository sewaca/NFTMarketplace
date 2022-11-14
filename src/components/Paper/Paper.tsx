import { useTheme, Paper as MUIPaper } from "@mui/material";
import React, { ReactNode } from "react";

type IPaperProps = {
  children?: ReactNode;
  variant?: "primary" | "secondary";
  sx?: Object;
  custom?: boolean;
  [key: string]: any;
};

export const Paper = ({
  children,
  variant = "primary",
  sx = {},
  custom = true,
  ...rest
}: IPaperProps) => {
  const theme = useTheme();
  const color =
    variant === "primary" ? theme.palette.primary : theme.palette.secondary;

  return custom ? (
    <MUIPaper
      square
      {...rest}
      sx={{
        "&::before, &::after": {
          content: "''",
          position: "absolute",
          width: 20,
          height: 20,
          zIndex: 1,
          border: "20px solid transparent",
        },
        "&::before": {
          bottom: 0,
          left: 0,
          borderBottomColor: theme.palette.background.default,
          borderLeftColor: theme.palette.background.default,
        },
        "&::after": {
          top: 0,
          right: 0,
          borderTopColor: theme.palette.background.default,
          borderRightColor: theme.palette.background.default,
        },
        position: "relative",
        background: color.main,
        color: color.contrastText,
        padding: "20px 16px 30px 16px",
        minHeight: 400,
        ...sx,
      }}
    >
      {children}
    </MUIPaper>
  ) : (
    <MUIPaper {...rest}>{children}</MUIPaper>
  );
};
