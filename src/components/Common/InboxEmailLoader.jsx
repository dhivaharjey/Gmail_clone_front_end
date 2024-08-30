import { CircularProgress, Typography } from "@mui/material";
import React from "react";

const InboxEmailLoader = () => {
  return (
    <div
      style={{
        marginTop: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100dvh",
      }}
    >
      <CircularProgress />
      <Typography sx={{ fontSize: "55px" }}>Loading......</Typography>
    </div>
  );
};

export default InboxEmailLoader;
