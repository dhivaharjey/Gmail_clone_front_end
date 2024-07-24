import React, { Suspense, useState } from "react";
import NavBar from "../components/NavBar";
import LeftSideBar from "../components/LeftSideBar/LeftSideBar";
import RightSideBar from "../components/RightSideBar/RightSideBar";
import InboxMails from "../components/MailsPage";
import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";
import InboxEmailLoader from "../components/Common/InboxEmailLoader";

const Dashboard = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState);
  };
  return (
    <>
      <NavBar toggleDrawer={toggleDrawer} />

      <LeftSideBar openDrawer={openDrawer} />
      <RightSideBar />
      <Suspense fallback={<InboxEmailLoader />}>
        <Outlet context={{ openDrawer }} />
        {/* <InboxMails openDrawer={openDrawer} /> */}
      </Suspense>
      {/* <InboxMails openDrawer={openDrawer} /> */}
    </>
  );
};

export default Dashboard;
