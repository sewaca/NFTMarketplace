import { CircularProgress } from "@mui/material";
import React from "react";

export default function Loader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
      }}
    >
      <CircularProgress sx={{ margin: "auto" }} />
    </div>
  );
}
