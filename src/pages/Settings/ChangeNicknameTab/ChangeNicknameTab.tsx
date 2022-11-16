import { FormControl, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import API from "../../../API/API";
import useApiRequest from "../../../hooks/useApiRequest";

interface ChangeNicknameTabProps {
  name: string;
}

export default function ChangeNicknameTab({ name }: ChangeNicknameTabProps) {
  const [value, setValue] = useState(name);
  console.log("name is:", name);
  console.log("value is:", value);

  return (
    <FormControl variant="filled">
      <TextField
        label="Никнейм"
        color="secondary"
        variant="standard"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </FormControl>
  );
}
