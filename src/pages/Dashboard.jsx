import React, { Suspense, lazy, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import LeftSideBar from "../components/LeftSideBar/LeftSideBar";
import RightSideBar from "../components/RightSideBar/RightSideBar";
import { Outlet } from "react-router-dom";

import InboxEmailLoader from "../components/Common/InboxEmailLoader";

const Dashboard = () => {
  const [refreshScreen, setRefreshScreen] = useState(false);

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
        setRefreshScreen={setRefreshScreen}
      />
      <RightSideBar />
      <Suspense fallback={<InboxEmailLoader />}>
        <Outlet
          context={{
            openDrawer,
            setOpenMsgBox,
            refreshScreen,
            setRefreshScreen,
          }}
        />
      </Suspense>
    </>
  );
};

export default Dashboard;
