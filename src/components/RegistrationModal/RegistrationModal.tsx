import {
  Box,
  Button,
  Checkbox,
  Fade,
  FormControlLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, {
  ChangeEvent,
  SyntheticEvent,
  useContext,
  useState,
} from "react";
import API from "../../API/API";
import { LoginContext } from "../../contexts/LoginContext";
import useApiMutation from "../../hooks/useApiMutation";
import useApiRequest from "../../hooks/useApiRequest";
import { ModalContentStyle, InputBoxStyle, InputStyle } from "./styles";

// Проверяем данные, вводимые пользователем :
const errorsText = {
  wrongEmail: "Неверный адрес электронной почты",
  weakPassword: "Пароль слишком простой",
  wrongSymbolsPassword:
    "Пожалуйтса, используйте только латинский алфавит, цифры и символы !@#$%^&*",
  passwordConfirmationWrong: "Пароли не совпадают",
  confirmTerms: "Для регистрации вы должны согласиться с правилами сервиса",
};
// min 8 letter password, with at least a symbol, upper and lower case letters and a number:
const password_difficulty_regexp =
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const email_correct_regexp = /^[0-9a-zA-Z.]+@[a-zA-Z.]{2,}[.][a-zA-Z]{2,}$/;

const testers = {
  email: (str: string) =>
    email_correct_regexp.test(str) && str.indexOf("..") === -1,
  password_difficulty: (str: string) => password_difficulty_regexp.test(str),
  password_correctSymbols: (str: string) =>
    /^[0-9a-zA-Z(!@#$%^&*)]+$/.test(str),
  passwordsMatching: (pass1: string, pass2: string) => pass1 === pass2,
};

interface RegistrationModalProps {
  closeHandler?: Function;
}
export default function RegistrationModal({
  closeHandler = () => {},
}: RegistrationModalProps) {
  const [opened, setOpened] = useState(true);
  const [, setLogin] = useContext(LoginContext);

  const { send } = useApiMutation();
  const { enqueueSnackbar } = useSnackbar();
  // Введнные пользователем данные
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    password_confirm: "",
    checkbox: true,
  });
  // Подсказки пользователю
  const [helpers, setHelpers] = useState({
    email: "",
    password: "",
    password_confirm: "",
    checkbox: "",
  });

  // ~ Хендлеры событий:
  const handleClose = () => {
    setOpened(false);
    closeHandler();
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setHelpers({
      ...helpers,
      email: !testers.email(value) ? errorsText.wrongEmail : "",
    });
    setFormdata({ ...formdata, email: value });
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setHelpers({
      ...helpers,
      password: !testers.password_correctSymbols(value)
        ? errorsText.wrongSymbolsPassword
        : !testers.password_difficulty(value)
        ? errorsText.weakPassword
        : "",
      password_confirm: !testers.passwordsMatching(
        value,
        formdata.password_confirm
      )
        ? errorsText.passwordConfirmationWrong
        : "",
    });
    setFormdata({ ...formdata, password: value });
  };
  const handlePasswordConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setHelpers({
      ...helpers,
      password_confirm: !testers.passwordsMatching(value, formdata.password)
        ? errorsText.passwordConfirmationWrong
        : "",
    });
    setFormdata({ ...formdata, password_confirm: value });
  };
  const handleRegistration = () => {
    // Если введенные пользователем данные содержат ошибку:
    //   проверяем согласие юзера с правилами
    if (!formdata.checkbox)
      return setHelpers({ ...helpers, checkbox: errorsText.confirmTerms });
    if (!testers.password_difficulty(formdata.password))
      return setHelpers({
        ...helpers,
        password: errorsText.weakPassword,
      });
    if (!testers.password_correctSymbols(formdata.password))
      return setHelpers({
        ...helpers,
        password: errorsText.wrongSymbolsPassword,
      });
    if (
      !testers.passwordsMatching(formdata.password, formdata.password_confirm)
    )
      return setHelpers({
        ...helpers,
        password_confirm: errorsText.passwordConfirmationWrong,
      });
    if (!testers.email(formdata.email))
      return setHelpers({
        ...helpers,
        email: errorsText.wrongEmail,
      });
    // Если пользовательские данные верны:
    send(
      API.registerUser({ email: formdata.email, password: formdata.password })
        .then((res) => res.json())
        .then((ans) => {
          if (ans.status === "error") {
            if (
              ans.errorCode === "WRONG_EMAIL" ||
              ans.errorCode === "WRONG_PASSWORD"
            )
              enqueueSnackbar(
                <Typography sx={{ lineHeight: 1 }} variant="body1">
                  Проверьте корректность введенных данных
                </Typography>,
                {
                  variant: "error",
                }
              );
            else if (ans.errorCode === "EMAIL_BUSY")
              enqueueSnackbar(
                <Typography sx={{ lineHeight: 1 }} variant="body1">
                  Аккаунт с такой почтой уже существует
                </Typography>,
                {
                  variant: "error",
                }
              );
            else
              enqueueSnackbar(
                <Typography sx={{ lineHeight: 1 }} variant="body1">
                  Непредвиденная ошибка. Попробуйте позже
                </Typography>,
                {
                  variant: "error",
                }
              );
            throw ans.errorCode || "error";
          }

          if (ans.status === "ok") {
            enqueueSnackbar("Успешная регистрация", { variant: "success" });
            setLogin(formdata.email);
            handleClose();
          }

          return ans;
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
            Зарегистрироваться
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
            <TextField
              variant="standard"
              label="Повторите пароль"
              color="secondary"
              type="password"
              sx={InputStyle}
              value={formdata.password_confirm}
              onChange={handlePasswordConfirmChange}
              helperText={
                <Typography variant="body1" color="primary" component="span">
                  {helpers.password_confirm}
                </Typography>
              }
            />
          </Box>
          <Box sx={InputBoxStyle}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formdata.checkbox}
                  onChange={() =>
                    setFormdata({ ...formdata, checkbox: !formdata.checkbox })
                  }
                  color="secondary"
                />
              }
              label={
                <Typography
                  variant="body1"
                  color="white"
                  sx={{ lineHeight: 0.9 }}
                >
                  Регистрируясь я соглашаюсь с правилами сервиса, которые вы
                  придумаете позже, а может вообще не придумаете
                </Typography>
              }
              labelPlacement="end"
            />
            <Typography variant="body1" color="primary">
              {helpers.checkbox}
            </Typography>
          </Box>
          <Box sx={InputBoxStyle}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: "100%" }}
              onClick={() => handleRegistration()}
            >
              Зарегистрироваться
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
