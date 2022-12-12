import { useContractFunction } from "@usedapp/core";
import React, { useState } from "react";
import { contract } from "../..";

export default function useCheckBalance() {
  const [state, setState] = useState({
    loading: false,
    error: "",
    data: 0,
  });

  const send = (adress: string, id: number) => {
    setState({ ...state, loading: true });
    contract
      .balanceOf(adress, id)
      .then((res: any) => {
        setState({
          ...state,
          loading: false,
          data: parseInt(res),
        });
      })
      .catch((err: any) => {
        setState({
          ...state,
          loading: false, 
          error: err,
        });
      });
  };

  return {
    state,
    send,
  };
}
