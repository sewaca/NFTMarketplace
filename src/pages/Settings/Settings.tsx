import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import "./cabinet.module.css";
import ChangeNicknameTab from "./ChangeNicknameTab";

interface CabinetProps {}

export default function Cabinet({}: CabinetProps) {
  const [active, setActive] = useState(0);

  const tabs = [
    { title: "Сменить никнейм", content: <ChangeNicknameTab /> },
    { title: "Сменить почту", content: <>123</> },
    { title: "Сменить пароль", content: <>123</> },
    { title: "Привязать кошелек", content: <>123</> },
    { title: "Отвязать кошелек", content: <>123</> },
  ];

  return (
    <Box sx={{ py: 4, bgcolor: "var(--block-background)" }}>
      <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
        Настройки
      </Typography>
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: ["column", "column", "row"] }}>
        <Tabs
          orientation="vertical"
          value={active}
          sx={{ maxWidth: ["100%", 300] }}
          onChange={(e, i) => setActive(i)}
          TabIndicatorProps={{ sx: { width: "3px" } }}
          variant="scrollable"
        >
          {tabs.map((tab, i) => (
            <Tab
              key={"tab_control__" + i}
              sx={{
                borderRight: "3px solid var(--secondary-main)",
                alignItems: "flex-start",
              }}
              label={
                <Typography
                  variant="body1"
                  color={active === i ? "primary" : "secondary"}
                >
                  {tab.title}
                </Typography>
              }
              value={i}
            />
          ))}
        </Tabs>
        {tabs.map((tab, i) => (
          <div key={"tab__" + i} role="tabpanel" hidden={active !== i}>
            <Box sx={{ py: 1, px: 2 }}>{tab.content}</Box>
          </div>
        ))}
      </Box>
    </Box>
  );
}
