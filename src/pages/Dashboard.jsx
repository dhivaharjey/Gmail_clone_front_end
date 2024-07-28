import React, { Suspense, lazy, useState } from "react";
import NavBar from "../components/NavBar";
import LeftSideBar from "../components/LeftSideBar/LeftSideBar";
import RightSideBar from "../components/RightSideBar/RightSideBar";
import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";
import InboxEmailLoader from "../components/Common/InboxEmailLoader";
const MailsPage = lazy(() => import("../components/MailsPage.jsx"));
const Dashboard = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openMsgBox, setOpenMsgBox] = useState(false);
  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState);
  };
  return (
    <>
      <NavBar toggleDrawer={toggleDrawer} />

      <LeftSideBar
        openDrawer={openDrawer}
        setOpenMsgBox={setOpenMsgBox}
        openMsgBox={openMsgBox}
      />
      <RightSideBar />
      <Suspense fallback={<InboxEmailLoader />}>
        <Outlet context={{ openDrawer, setOpenMsgBox }} />
      </Suspense>
    </>
  );
};

export default Dashboard;
