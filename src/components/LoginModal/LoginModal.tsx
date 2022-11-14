import {
  Modal,
  Fade,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { ChangeEvent, useState } from "react";
import { useCookies } from "react-cookie";
import API from "../../API/API";
import useApiMutation from "../../hooks/useApiMutation";
import { InputBoxStyle, InputStyle, ModalContentStyle } from "./styles";

// Тестеры для введенных пользователем данных:
const email_correct_regexp = /^[0-9a-zA-Z.]+@[a-zA-Z.]{2,}[.][a-zA-Z]{2,}$/;
const testers = {
  email: (str: string) =>
    email_correct_regexp.test(str) && str.indexOf("..") === -1,
  password_correctSymbols: (str: string) =>
    /^[0-9a-zA-Z(!@#$%^&*)]+$/.test(str),
};
// сообщения об ошибках:
const errorsText = {
  wrongEmail: "Неверный адрес электронной почты",
  wrongSymbolsPassword:
    "Пожалуйтса, используйте только латинский алфавит, цифры и символы !@#$%^&*",
};

interface LoginModalProps {
  closeHandler: Function;
}
export default function LoginModal({
  closeHandler = () => { },
}: LoginModalProps) {
  const [opened, setOpened] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [, setLogin] = useCookies(["login"]);
  const { send } = useApiMutation();
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });
  const [helpers, setHelpers] = useState({
    email: "",
    password: "",
  });

  // Handlers :
  const handleClose = () => {
    closeHandler();
    setOpened(false);
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHelpers({
      ...helpers,
      email: testers.email(e.target.value) ? "" : errorsText.wrongEmail,
    });
    setFormdata({ ...formdata, email: e.target.value });
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHelpers({
      ...helpers,
      password: testers.password_correctSymbols(e.target.value)
        ? ""
        : errorsText.wrongSymbolsPassword,
    });
    setFormdata({ ...formdata, password: e.target.value });
  };
  const handleLogin = () => {
    if (!testers.email(formdata.email))
      return setHelpers({
        ...helpers,
        email: errorsText.wrongEmail,
      });
    if (!testers.password_correctSymbols(formdata.password))
      return setHelpers({
        ...helpers,
        password: errorsText.wrongSymbolsPassword,
      });

    send(
      API.loginUser({ email: formdata.email, password: formdata.password })
        .then((res: any) => res.json())
        .then((ans: any) => {
          if (ans.status === "error")
            enqueueSnackbar(
              <Typography variant="body1">
                Неверный логин и/или пароль
              </Typography>,
              { variant: "error" }
            );
          else {
            enqueueSnackbar(
              <Typography variant="body1">Успешная авторизация</Typography>,
              { variant: "success" }
            );
            setLogin("login", formdata.email);
            handleClose();
          }
        })
    );
  };

  return (
    <Modal open={opened} onClose={() => handleClose()}>
      <Fade in={opened}>
        <Box sx={ModalContentStyle}>
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              "@media(max-width: 500px)": { fontSize: "1.8rem", mb: 0 },
            }}
          >
            Войти
          </Typography>
          <Box sx={InputBoxStyle}>
            <TextField
              variant="standard"
              label="EMail"
              color="secondary"
              type="text"
              sx={InputStyle}
              value={formdata.email}
              onChange={handleEmailChange}
              helperText={
                <Typography variant="body1" color="primary" component="span">
                  {helpers.email}
                </Typography>
              }
            />
          </Box>
          <Box sx={InputBoxStyle}>
            <TextField
              variant="standard"
              label="Пароль"
              color="secondary"
              type="password"
              sx={InputStyle}
              value={formdata.password}
              onChange={handlePasswordChange}
              helperText={
                <Typography variant="body1" color="primary" component="span">
                  {helpers.password}
                </Typography>
              }
            />
          </Box>
          <Box sx={InputBoxStyle}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: "100%" }}
              onClick={() => handleLogin()}
            >
              Войти
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
