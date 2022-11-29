import { Button, FormControl, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import API from "../../../API/API";
import useApiRequest from "../../../hooks/useApiRequest";

interface ChangeNicknameTabProps {
  name: string;
}

export default function ChangeNicknameTab({ name }: ChangeNicknameTabProps) {
  const [value, setValue] = useState(name);

  return (
    <FormControl variant="filled" sx={{ maxWidth: 400, width: "100%" }}>
      <TextField
        label="Никнейм"
        color="secondary"
        variant="standard"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button variant="outlined" sx={{ mt: 2 }}>
        Сменить
      </Button>
    </FormControl>
  );
}
