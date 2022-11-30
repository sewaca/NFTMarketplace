import { useEffect, useState } from "react";

interface useApiRequestProps {
  request: () => Promise<any>;
  key?: string;
}

export default function useApiRequest({
  request,
  key = "default",
}: useApiRequestProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<any>("");

  useEffect(() => {
    console.log("new request with key: ", key);
    request()
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, error, data };
}
