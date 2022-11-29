// Layout
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LoginModal from "../../components/LoginModal";
import RegistrationModal from "../../components/RegistrationModal";
// Hooks
import React, { ReactNode, useState } from "react";
import { useCookies } from "react-cookie";
import { useEthers } from "@usedapp/core";

interface ErrorPageProps {
  errorCode: "requiredAuthorization" | "unavailable" | "404" | string;
}

export default function ErrorPage({ errorCode }: ErrorPageProps) {
  const { activateBrowserWallet } = useEthers();
  const [modal, setModal] = useState<ReactNode | null>(null);
  const [{ login }] = useCookies(["login"]);

  switch (errorCode) {
    case "404":
      return (
        <>
          <Typography variant="h4">Ошибка 404</Typography>
          <Typography
            variant="body1"
            sx={{ color: "secondary.main", fontSize: 22 }}
          >
            Страница не существует.
          </Typography>
          <Link to="/">На главную</Link>
        </>
      );
    case "requiredAuthorization":
      return (
        <>
          <Typography variant="h4">Страница недоступна</Typography>
          <Typography
            variant="body1"
            sx={{ color: "secondary.main", fontSize: 22 }}
          >
            Данная страница доступна только зарегистрированным пользователям,
            привязавшим свой кошелек
          </Typography>
          {login ? (
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 1 }}
              onClick={(e) => activateBrowserWallet()}
            >
              привязать кошелек
            </Button>
          ) : (
            <div style={{ marginTop: 12 }}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ mr: 1 }}
                onClick={(e) =>
                  setModal(
                    <RegistrationModal closeHandler={() => setModal(null)} />
                  )
                }
              >
                Зарегистрироваться
              </Button>
              <Button
                onClick={() =>
                  setModal(<LoginModal closeHandler={() => setModal(null)} />)
                }
                variant="contained"
                color="primary"
              >
                Войти
              </Button>
            </div>
          )}
          {modal}
        </>
      );
    default:
      return (
        <>
          <Typography variant="h4">Что-то пошло не так...</Typography>
          <Typography
            variant="body1"
            sx={{ color: "secondary.main", fontSize: 22, mt: 1 }}
          >
            Наверняка мы уже устраняем проблему. Попробуйте через пару минут
          </Typography>
        </>
      );
  }
}
