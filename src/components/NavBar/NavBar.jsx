import React, { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  InputBase,
} from "@mui/material";
import { styled } from "@mui/system";

import gmailLogo from "../constants/icon";
import {
  AccountCircle,
  AppsOutlined,
  HelpOutlineOutlined,
  Menu,
  Search,
  SettingsOutlined,
  TuneOutlined,
} from "@mui/icons-material";
import ProfileIcon from "./ProfileIcon";
import HelpCenter from "./HelpCenterIcon";
const StyledToolBar = styled(Toolbar)({
  display: "flex",
  alignItems: "center",
});

const SearchBox = styled("div")(({ active, theme }) => ({
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    // flexGrow: 6,
    width: "80%",
    height: "40px",
    margin: "0 10px",
  },
  alignItems: "center",
  backgroundColor: active ? "white" : "#E4EDFC",
  padding: "0 10px",
  borderRadius: "25px",
  width: "47%",
  height: "48px",
  marginLeft: "60px",
  marginRight: "10px",
  boxShadow: active ? "rgba(0, 0, 0, 0.4) 0px 1px 2px" : "none",
}));

const Options = styled("div")({
  height: "60px",
  alignItems: "center",
  gap: 3,
  backgroundColor: "#F5F5F5",
  color: "#595C5B",
  marginLeft: "auto",
  marginRight: "-20px",
});

export default function NavBar({ toggleDrawer }) {
  const [searchActive, setSearchActive] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearchActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchBarClick = () => {
    setSearchActive(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          position: "sticky",
          top: "0",
          boxShadow: "none",
          flexGrow: 1,
          background: "#F6F8FC",
          zIndex: 10,
        }}
      >
        <StyledToolBar>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ display: { xs: "flex", sm: "none" } }}>
              <img
                src={gmailLogo}
                alt="Logo"
                style={{
                  width: "35px",
                  height: "35px",
                  marginLeft: "2px",
                }}
              />
            </Box>
            <IconButton
              sx={{ display: { xs: "none", sm: "flex" } }}
              onClick={toggleDrawer}
            >
              <Menu color="action" Toolbar="Main Menu" />
            </IconButton>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <img
                src={gmailLogo}
                alt="Logo"
                style={{
                  width: "35px",
                  height: "35px",
                  marginLeft: "10px",
                }}
              />
            </Box>
            <Typography
              variant="h5"
              // fontWeight="100"
              color="#595C5B"
              padding="7px"
              sx={{
                display: { xs: "none", sm: "block" },
                fontFamily: "Jost",
                fontWeight: "450",
              }}
            >
              Gmail
            </Typography>
          </Box>

          <SearchBox
            ref={searchRef}
            active={searchActive}
            onClick={handleSearchBarClick}
          >
            <IconButton
              sx={{ color: "#5F5F5F", display: { xs: "flex", sm: "none" } }}
            >
              <Menu onClick={toggleDrawer} />
            </IconButton>
            <IconButton
              sx={{ color: "#5F5F5F", display: { xs: "none", sm: "flex" } }}
            >
              <Search />
            </IconButton>
            <InputBase
              sx={{ width: "660px" }}
              placeholder="Search email..."
              inputRef={inputRef}
            />

            <IconButton
              sx={{ justifyContent: "space-between", color: "#5F5F5F" }}
            >
              <TuneOutlined sx={{ display: { xs: "none", sm: "block" } }} />
            </IconButton>
            <IconButton
              sx={{
                display: { xs: "flex", sm: "none" },
              }}
            >
              <ProfileIcon />
            </IconButton>
          </SearchBox>

          <Options sx={{ display: { xs: "none", sm: "flex" } }}>
            <HelpCenter />

            <IconButton>
              <SettingsOutlined />
            </IconButton>
            <IconButton>
              <AppsOutlined />
            </IconButton>

            <ProfileIcon />
          </Options>
        </StyledToolBar>
      </AppBar>
    </>
  );
}
