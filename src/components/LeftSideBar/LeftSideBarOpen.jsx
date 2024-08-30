import React from "react";

import {
  Box,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import { CreateOutlined } from "@mui/icons-material";
import styled from "styled-components";

import { NavLink, useParams } from "react-router-dom";
import SIDEBAR_DATA from "../Config/LeftSideBar.config";
import { routes } from "../../routers/routes";

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  marginTop: { xs: "56px", sm: "64px" },
  "& > ul > a": {
    textDecoration: "none",
    color: "#404040",
  },
});

const LeftSideBarOpen = ({ setOpenMsgBox }) => {
  const { type } = useParams();

  return (
    <>
      <Container>
        <IconButton
          sx={{
            display: { xs: "none", sm: "flex" },
            fontFamily: "Jost",
            margin: "10px 18px 8px 8px",
            width: "150px",
            color: "black",
            padding: "18px",
            borderRadius: "15px",
            backgroundColor: "#C2E7FF",
            "&:hover": {
              backgroundColor: "#C2E7FF",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
            },
          }}
          onClick={() => setOpenMsgBox(true)}
        >
          <CreateOutlined sx={{ marginLeft: "-8.5px" }} />
          <Typography sx={{ marginLeft: "12px" }}>Compose</Typography>
        </IconButton>

        <List>
          {SIDEBAR_DATA.map((data) => {
            return (
              <NavLink
                key={data.name}
                to={`${routes.emails.path}/${data.name}`}
              >
                <IconButton
                  index={data.id}
                  style={
                    type === data.name.toLowerCase()
                      ? { backgroundColor: "#d3e3fd" }
                      : {}
                  }
                  sx={{
                    display: "flex",
                    width: "240px",
                    justifyContent: "flex-start",
                    padding: "5px 0px 5px 27.4px",
                    borderRadius: "0px 20px 20px 0px",
                    marginBottom: "1px",
                    color: "#404040",
                  }}
                >
                  <data.icon fontSize="small" sx={{ marginRight: "20px" }} />
                  <Typography
                    sx={{ fontSize: "15px" }}
                    style={
                      type === data.name.toLowerCase()
                        ? { backgroundColor: "#d3e3fd", fontWeight: "bold" }
                        : {}
                    }
                  >
                    {data.title}
                  </Typography>
                </IconButton>
              </NavLink>
            );
          })}
        </List>
      </Container>
    </>
  );
};

export default LeftSideBarOpen;
