import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

export default function useApiMutatuion() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<any>("");
  const { enqueueSnackbar } = useSnackbar();

  const errorText = "Произошла ошибка. Попробуйте позже";
  const successText = "Коллекция успешно выпущенна";

  const send = (request: Promise<any>) => {
    setLoading(true);
    request
      .then((ans) => {
        setLoading(false);
        enqueueSnackbar(successText, { variant: "success" });
        setData(ans);
      })
      .catch((err) => {
        enqueueSnackbar(errorText, { variant: "error" });
        console.log(err);
        setLoading(false);
        setError(err);
      });
  };

  return { loading, error, data, send };
}
