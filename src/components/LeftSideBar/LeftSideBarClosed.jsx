import React, { useEffect, useState } from "react";
import { Box, IconButton, List, ListItemButton } from "@mui/material";
import {
  CreateOutlined,
  InboxRounded,
  InsertDriveFileOutlined,
  MailOutlined,
  SendOutlined,
  StarBorderOutlined,
  AccessTimeOutlined,
} from "@mui/icons-material";

import styled from "styled-components";
import SIDEBAR_DATA from "../Config/LeftSideBar.config.js";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { routes } from "../../routers/routes.js";

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
const LeftSideBarClosed = ({ setOpenMsgBox }) => {
  const { type } = useParams();

  return (
    <>
      <Container>
        <IconButton
          sx={{
            display: { xs: "none", sm: "flex" },
            padding: "18px",
            margin: "10px 0px 6px 0px",
            borderRadius: "15px",
            backgroundColor: "#C2E7FF",
            color: "black",
            "&:hover": {
              backgroundColor: "#C2E7FF",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
            },
          }}
          onClick={() => setOpenMsgBox(true)}
        >
          <CreateOutlined />
        </IconButton>

        <List>
          {SIDEBAR_DATA.map((data) => {
            return (
              <NavLink
                key={data.name}
                to={`${routes.emails.path}/${data.name}`}
              >
                <IconButton
                  style={
                    type === data.name.toLowerCase()
                      ? { backgroundColor: "#d3e3fd" }
                      : {}
                  }
                  index={data.id}
                  sx={{
                    borderRadius: "55%",
                    padding: "8.2px",
                    marginBottom: "-3px",
                    display: "flex",
                    color: "#404040",
                  }}
                >
                  <data.icon
                    fontSize="small"
                    style={
                      type === data.name.toLowerCase()
                        ? { backgroundColor: "#d3e3fd" }
                        : {}
                    }
                  />
                </IconButton>
              </NavLink>
            );
          })}
        </List>
      </Container>
    </>
  );
};

export default LeftSideBarClosed;
