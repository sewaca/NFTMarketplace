import { useState } from "react";

export default function useApiMutatuion() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<any>("");

  const send = (request: () => Promise<any>) => {
    setLoading(true);
    request()
      .then((ans) => {
        setLoading(false);
        setData(ans);
        setError("");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setData(undefined);
        setError(err);
      });
  };

  return { loading, error, data, send };
}
