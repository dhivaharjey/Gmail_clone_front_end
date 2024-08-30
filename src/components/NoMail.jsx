import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
const Component = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  marginTop: "50px",
  opacity: ".8",
  width: "100%",
});
const StyledDivider = styled(Divider)({
  width: "100%",
  marginTop: "20px",
});
const NoMail = ({ message }) => {
  return (
    <>
      <Component>
        <Typography>{message.heading}</Typography>
        <Typography>{message.subHeading}</Typography>
        <StyledDivider />
      </Component>
    </>
  );
};

export default NoMail;
