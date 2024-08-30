import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import gmailLogo from "../constants/icon";
import LinearProgress from "@mui/material/LinearProgress";
const SuspenseLoader = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
          height: "100dvh",
        }}
      >
        <img
          src={gmailLogo}
          alt="Logo"
          style={{
            width: "300px",
            height: "300px",
          }}
        />
        <Box sx={{ width: "40%" }}>
          <LinearProgress />
        </Box>
      </Box>
    </>
  );
};

export default SuspenseLoader;
