import { Box, Typography } from "@mui/material";
import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorComponent = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <>
      <Box style={{ marginLeft: "280px" }}>
        <Typography>Error in Loading paddingLeft</Typography>
      </Box>
    </>
  );
};

export default ErrorComponent;
