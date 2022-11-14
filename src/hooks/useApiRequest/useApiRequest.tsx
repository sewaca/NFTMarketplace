import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

interface useApiRequestProps {
  request: Promise<any>;
  key?: string;
}

export default function useApiRequest({
  request,
  key = "default",
}: useApiRequestProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<any>("");
  const { enqueueSnackbar } = useSnackbar();

  const errorText = "Произошла ошибка. Попробуйте позже";
  const successText = "Коллекция успешно выпущенна";

  useEffect(() => {
    console.log("new request with key: ", key);
    request
      .then((ans) => {
        setLoading(false);
        // enqueueSnackbar(successText, { variant: "success" });
        setData(ans);
        setError("");
      })
      .catch((err) => {
        setLoading(false);
        // enqueueSnackbar(errorText, { variant: "error" });
        setError(err);
      });
  }, [key]);

  return { loading, error, data };
}
