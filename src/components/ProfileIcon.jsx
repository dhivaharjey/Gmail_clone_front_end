import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import styled from "@emotion/styled";
import {
  AccountCircle,
  AddOutlined,
  Clear,
  EditOutlined,
  LogoutOutlined,
} from "@mui/icons-material";

export default function ProfileIcon() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const StyledButton = styled(Button)({
    padding: "10px 30px",
    border: "1px solid black",
    borderRadius: "30px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#D4DEF7",
    },
  });
  const AccountBox = styled(Button)({
    display: "flex",
    cursor: "pointer",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "lightgrey",
    },
  });

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AccountCircle
          fontSize="large"
          sx={{ display: { xs: "none", sm: "flex" } }}
        />
        <AccountCircle
          fontSize="large"
          sx={{ display: { xs: "flex", sm: "none" } }}
        />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              width: { xs: "300px", sm: "400px" },
              height: { xs: "450px", sm: "360px" },
              backgroundColor: "#DFEAF0",
              borderRadius: "30px",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              marginTop: "5px",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "7px",
          }}
        >
          <Typography>example@gmail.com</Typography>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", right: "10px", top: "7px" }}
          >
            <Clear />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "12px",
          }}
        >
          <IconButton>
            <Avatar sx={{ width: "80px", height: "80px" }} />
            <EditOutlined
              sx={{
                position: "absolute",
                bottom: "15px",
                right: "6px",
                padding: "2px",
                backgroundColor: "white",
                borderRadius: "15px",
              }}
            />
          </IconButton>
        </Box>
        <Typography
          sx={{ textAlign: "center", fontSize: "25px", margin: "3px 0px" }}
        >
          Hi,dhivahar!
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: { xs: "0px 10px", sm: "0px 20px" },
          }}
        >
          <StyledButton>Manage your Google Account</StyledButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: { xs: "column", sm: "row" },
            margin: "15px 0",
          }}
        >
          {/* <AccountBox
            sx={{
              borderRadius: "30px 0px 0px 30px",
              padding: {
                xs: "10px 30px",
                sm: "20px 40px",
                margin: { xs: "0px 10px 20px 10px", sm: "" },
              },
            }}
          >
            <AddOutlined color="primary" />
            <Typography sx={{ color: "black", textTransform: "none" }}>
              Add account
            </Typography>
          </AccountBox> */}
          <AccountBox
            sx={{
              borderRadius: "30px 0px 0px 30px",
              padding: { xs: "10px 30px", sm: "0px 30px" },
              margin: { xs: "10px 0px 10px 10px", sm: "0px" },
            }}
          >
            <AddOutlined color="primary" />
            <Typography
              sx={{ color: "black", textTransform: "none", marginLeft: "12px" }}
            >
              Add account
            </Typography>
          </AccountBox>
          <AccountBox
            sx={{
              borderRadius: "0px 30px 30px 0px",
              padding: { xs: "10px 30px", sm: "20px 40px" },
              margin: { xs: "0px 10px 20px 0", sm: "0px 0px 0px 2px" },
            }}
          >
            <LogoutOutlined color="action" />
            <Typography
              sx={{ color: "black", textTransform: "none", marginLeft: "10px" }}
            >
              Sign Out
            </Typography>
          </AccountBox>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            color: "grey",
            // fontSize: "5px",
          }}
        >
          <Typography sx={{ fontSize: "12px" }}>Privacy Policy . </Typography>

          <Typography sx={{ fontSize: "12px" }}> Terms of Service </Typography>
        </Box>
      </Menu>
    </>
  );
}
