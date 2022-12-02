import { useEffect, useState } from "react";

interface useApiRequestProps {
  request: () => Promise<any>;
  key?: string;
}

type IUseApiRequestAnswer = {
  loading: boolean;
  data: any;
  error: string;
};

export default function useApiRequest({
  request,
  key = "default",
}: useApiRequestProps) {
  const [state, setState] = useState<IUseApiRequestAnswer>({
    loading: true,
    data: undefined,
    error: "",
  });

  useEffect(() => {
    console.log("new request with key: ", key);
    request()
      .then((ans) => {
        setState({
          loading: false,
          data: ans,
          error: "",
        });
      })
      .catch((err) => {
        setState({
          loading: false,
          data: undefined,
          error: err,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}
