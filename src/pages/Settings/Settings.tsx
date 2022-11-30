// Layout
import { Box, CircularProgress, Tab, Tabs, Typography } from "@mui/material";
import ErrorPage from "../ErrorPage";
import ChangeNicknameTab from "./ChangeNicknameTab";
// hooks:
import React, { useContext, useState } from "react";
import useApiRequest from "../../hooks/useApiRequest";
// Other :
import API from "../../API/API";
import { LoginContext } from "../../contexts/LoginContext";

export default function Settings() {
  const [active, setActive] = useState(0);
  const [login] = useContext(LoginContext);

  // TODO: Возможно стоит разделить запрос и раскидать по табам
  const {
    data: userData,
    loading,
    error,
  } = useApiRequest({
    request: () =>
      API.getUserInfo({
        login: login || "",
        fields: ["avatar", "email", "name", "wallet"],
      }).then((res) => res.json()),
    key: "gettingUserInfo_on_settingsPage",
  });

  const tabs = [
    {
      title: "Сменить никнейм",
      content: <ChangeNicknameTab name={userData.name || ""} />,
    },
    { title: "Сменить почту", content: <>123</> },
    { title: "Сменить пароль", content: <>123</> },
    { title: "Привязать кошелек", content: <>123</> },
    { title: "Отвязать кошелек", content: <>123</> },
  ];

  return error ? (
    <ErrorPage errorCode="unavaliable" />
  ) : (
    <Box sx={{ py: 4, bgcolor: "var(--block-background)" }}>
      <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
        Настройки
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: ["column", "column", "row"],
        }}
      >
        <Tabs
          orientation="vertical"
          value={active}
          sx={{ maxWidth: ["100%", 300], flexShrink: 0 }}
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
        {loading ? (
          <CircularProgress sx={{ mt: 6, mx: "auto" }} />
        ) : (
          tabs.map((tab, i) => (
            <div
              key={"tab__" + i}
              role="tabpanel"
              hidden={active !== i}
              style={{ width: "100%" }}
            >
              <Box sx={{ py: 1, px: 4, mx: "auto" }}>{tab.content}</Box>
            </div>
          ))
        )}
      </Box>
    </Box>
  );
}
