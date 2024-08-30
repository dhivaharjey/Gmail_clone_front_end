import React, { useState } from "react";
import { Drawer } from "@mui/material";

import LeftSideBarClosed from "./LeftSideBarClosed";
import LeftSideBarOpen from "./LeftSideBarOpen";
import ComposeMail from "../ComposeMail";
const LeftSideBar = ({
  openDrawer,
  openMsgBox,
  setOpenMsgBox,
  setRefreshScreen,
}) => {
  return (
    <>
      {openDrawer ? (
        <Drawer
          anchor="left"
          open={openDrawer}
          hideBackdrop={true}
          ModalProps={{
            keepMounted: true,
          }}
          variant="persistent"
          sx={{
            "& .MuiDrawer-paper": {
              marginTop: { xs: "54px", sm: "64px" },
              width: "250px",
              background: "#F6F8FC",
              borderRight: "none",
              height: "calc(100vh-64px)",
            },
          }}
        >
          <LeftSideBarOpen setOpenMsgBox={setOpenMsgBox} />
        </Drawer>
      ) : (
        <Drawer
          anchor="left"
          open={true}
          hideBackdrop={true}
          ModalProps={{
            keepMounted: true,
          }}
          variant="persistent"
          sx={{
            "& .MuiDrawer-paper": {
              marginTop: { xs: "54px", sm: "64px" },
              width: "75px",
              background: "#F6F8FC",
              borderRight: "none",
              height: "calc(100vh-64px)",
            },
          }}
        >
          <LeftSideBarClosed setOpenMsgBox={setOpenMsgBox} />
        </Drawer>
      )}
      <ComposeMail
        openMsgBox={openMsgBox}
        setOpenMsgBox={setOpenMsgBox}
        setRefreshScreen={setRefreshScreen}
      />
    </>
  );
};

export default LeftSideBar;
