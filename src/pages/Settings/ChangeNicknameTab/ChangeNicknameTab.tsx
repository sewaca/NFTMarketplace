import { FormControl, TextField, Typography } from "@mui/material";
import React from "react";
import API from "../../../API/API";
import useApiRequest from "../../../hooks/useApiRequest";

interface ChangeNicknameTabProps {}

export default function ChangeNicknameTab({}: ChangeNicknameTabProps) {
  // const {data: oldNickname} = useApiRequest({
  //   key: "get_old_nickname",
  //   request: ()=>API
  // });

  return (
    <FormControl>
      <TextField label="Новый Никнейм" color="secondary" variant="standard" />
    </FormControl>
  );
}
