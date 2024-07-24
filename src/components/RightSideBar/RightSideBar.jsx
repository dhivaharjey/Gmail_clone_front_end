import styled from "@emotion/styled";
import { Add, AddCardSharp } from "@mui/icons-material";
import { Box, Button, Drawer, IconButton } from "@mui/material";
import React from "react";

const StyledIconButton = styled(IconButton)({
  marginBottom: "17px",
});
const RightSideBar = () => {
  return (
    <>
      <Drawer
        anchor="right"
        open={true}
        hideBackdrop={true}
        ModalProps={{
          keepMounted: true,
        }}
        variant="persistent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            marginTop: { xs: "54px", sm: "64px" },
            width: "55px",
            background: "#F6F8FC",
            border: "none",
            height: "calc(100vh-64px)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            // justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "0px",
            height: "100vh",
          }}
        >
          <StyledIconButton sx={{ marginTop: "8px" }}>
            <img src="/calender.png" alt="task image" width="33px" />
          </StyledIconButton>
          <StyledIconButton>
            <img
              src="/Google_Keep_icon.png"
              alt="task image"
              width="18px"
              height="19px"
            />
          </StyledIconButton>
          <StyledIconButton>
            <img src="/task.png" alt="task image" width="18px" />
          </StyledIconButton>
          <StyledIconButton>
            <img
              src="/Contacts.png"
              alt="task image"
              width="16px"
              sx={{ background: "#F6F8FC" }}
            />
          </StyledIconButton>
          <IconButton sx={{ marginTop: "34px" }}>
            <Add />
          </IconButton>
        </Box>
      </Drawer>
    </>
  );
};

export default RightSideBar;
