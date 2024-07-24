import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPenClip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AddToDriveOutlined,
  ArrowDropUpOutlined,
  AttachFileOutlined,
  Close,
  CloseFullscreenOutlined,
  FormatColorTextOutlined,
  FullscreenOutlined,
  InsertEmoticonOutlined,
  InsertLinkOutlined,
  InsertPhotoOutlined,
  LockOutlined,
  MinimizeRounded,
  MoreVertOutlined,
  OpenInFullOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  InputBase,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import axios from "axios"; // Import Axios
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.urls";

const dialogStyle = (exitFullScreen) => ({
  height: exitFullScreen ? "90%" : "505px",
  width: exitFullScreen ? "80%" : "535px",
  maxWidth: exitFullScreen ? "100%" : "1400px",
  maxHeight: exitFullScreen ? "100%" : "1400px",
  borderRadius: exitFullScreen ? "10px 10px 0 0" : "10px 10px 0 0",
  boxShadow: exitFullScreen
    ? "none"
    : "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
  position: exitFullScreen ? "relative" : "fixed",
  bottom: exitFullScreen ? "auto" : "-30px",
  right: exitFullScreen ? "auto" : "40px",
  zIndex: exitFullScreen ? "auto" : 1000,
});

const Header = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 15px",
  backgroundColor: "#F2F6FC",
  "& > p": {
    fontSize: "14px",
    fontWeight: "500",
  },
});

const RecipientsWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "2px 15px",
  "& > div": {
    fontSize: "14px",
    borderBottom: "2px solid #F5F5F5",
    padding: "2px 0",
    position: "relative",
  },
});

const CustomInputBase = styled(InputBase)({
  width: "100%",
  "& input::placeholder": {
    color: "black",
    fontSize: "14px",
  },
});

const Footer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 15px",
  marginTop: "15px",
});

const SendButton = styled(Button)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#0B57D0",
  color: "#fff",
  borderRadius: "60px",
  width: "110px",
  textTransform: "none",
  fontWeight: "bold",
  paddingLeft: "16px",
  marginRight: "5px",
  "&:hover": {
    backgroundColor: "#0B57D0",
    color: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.4) 2px 5px 15px",
  },
});

const IconOptions = styled(IconButton)({
  padding: "0 6px",
});

const ComposeMail = ({ openMsgBox, setOpenMsgBox }) => {
  const [refreshScreen, setRefreshScreen] = useState(false);
  const [isRecipientFocused, setRecipientFocused] = useState(false);
  const [data, setData] = useState({});
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [exitFullScreen, setExitFullScreen] = useState(isSmallScreen);
  const fileInputRef = useRef(null);
  const sentEmailService = useApi(API_URLS.saveSentEmail);
  const saveDraftService = useApi(API_URLS.saveDraftEmails);

  const closeComposeMail = (e) => {
    e.preventDefault();
    const payload = {
      to: data.to,
      from: "updatenewversion07@gmail.com",
      subject: data.subject,
      body: data.body,
      date: new Date(),
      image: "",
      name: "Code for interview",
      starred: false,
      type: "drafts",
    };
    saveDraftService.call(payload);
    if (!saveDraftService.error) {
      setOpenMsgBox(false);
      setData({});
    } else {
    }
    setOpenMsgBox(false);

    setExitFullScreen(isSmallScreen);
    setRefreshScreen(true);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file);
  };

  const handleAttachFileClick = () => {
    fileInputRef.current.click();
  };

  const sendMail = (e) => {
    e.preventDefault();

    if (window.Email) {
      Email.send({
        // ...config,
        Host: "smtp.elasticemail.com",
        Port: 2525,
        Username: process.env.REACT_APP_USERNAME,
        // Password: "FD584DCBDD9F7DCC8D70B40948987E06EBBA",
        Password: process.env.REACT_APP_PASSWORD,
        To: data.to,
        From: "updatenewversion07@gmail.com",
        Subject: data.subject,
        Body: data.body,
      }).then((message) => alert(message));
    }
    const payload = {
      to: data.to,
      from: "updatenewversion07@gmail.com",
      subject: data.subject,
      body: data.body,
      date: new Date(),
      image: "",
      name: "Code for interview",
      starred: false,
      snooze: false,
      type: "sent",
    };
    sentEmailService.call(payload);
    if (!sentEmailService.error) {
      setOpenMsgBox(false);
      setData({});
    } else {
    }
    setOpenMsgBox(false);
    setExitFullScreen(isSmallScreen);
    setRefreshScreen(true);
  };
  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setExitFullScreen(isSmallScreen);
    setRefreshScreen(true);
  }, [isSmallScreen, refreshScreen]);
  return (
    <Dialog
      open={openMsgBox}
      hideBackdrop={exitFullScreen ? isSmallScreen : true}
      PaperProps={{ sx: dialogStyle(exitFullScreen) }}
    >
      <Header>
        <Typography>New Message</Typography>
        <Box>
          <IconButton
            sx={{
              fontSize: "17px",
              borderRadius: "0px 0px 0px 0px",
              padding: "0px",
              marginRight: "4px",
            }}
          >
            <MinimizeRounded
              fontSize="small"
              sx={{ marginRight: "3px", display: { xs: "none", sm: "block" } }}
            />
          </IconButton>
          {exitFullScreen ? (
            <IconButton
              onClick={() => setExitFullScreen(!exitFullScreen)}
              sx={{
                fontSize: "13px",
                borderRadius: "0px 0px 0px 0px",
                padding: "0px",
                marginRight: "4px",
              }}
            >
              <CloseFullscreenOutlined
                fontSize="small"
                sx={{ display: { xs: "none", sm: "block" } }}
              />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => setExitFullScreen(!exitFullScreen)}
              sx={{
                fontSize: "17px",
                borderRadius: "0px 0px 0px 0px",
                padding: "0px",
                marginRight: "4px",
              }}
            >
              <OpenInFullOutlined
                fontSize="small"
                sx={{ display: { xs: "none", sm: "block" } }}
              />
            </IconButton>
          )}
          <IconButton
            onClick={(e) => closeComposeMail(e)}
            sx={{
              fontSize: "17px",
              borderRadius: "0px 0px 0px 0px",
              padding: "0px",
            }}
          >
            <Close fontSize="23px" />
          </IconButton>
        </Box>
      </Header>

      <RecipientsWrapper>
        <Box>
          <CustomInputBase
            placeholder={isRecipientFocused ? null : "Recipients"}
            onFocus={() => setRecipientFocused(true)}
            onBlur={() => setRecipientFocused(false)}
            startAdornment={
              isRecipientFocused ? (
                <span style={{ marginRight: "5px", fontSize: "14px" }}>To</span>
              ) : null
            }
            name="to"
            onChange={(e) => onValueChange(e)}
          />
        </Box>
        <Box>
          <CustomInputBase
            placeholder="Subject"
            name="subject"
            onChange={(e) => onValueChange(e)}
          />
        </Box>
      </RecipientsWrapper>
      <TextField
        multiline
        rows={exitFullScreen ? 17 : 12}
        sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
        name="body"
        onChange={(e) => onValueChange(e)}
      />
      <Footer>
        <Box sx={{ display: "flex" }}>
          <SendButton onClick={(e) => sendMail(e)}>
            Send
            <ArrowDropUpOutlined
              sx={{
                borderLeft: "1px solid black",
                marginLeft: "2px",
                paddingLeft: "4px",
              }}
            />
          </SendButton>
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <IconOptions>
              <FormatColorTextOutlined fontSize="small" />
            </IconOptions>
            <IconOptions onClick={handleAttachFileClick}>
              <AttachFileOutlined fontSize="small" />
            </IconOptions>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
            <IconOptions>
              <InsertLinkOutlined fontSize="small" />
            </IconOptions>
            <IconOptions>
              <InsertEmoticonOutlined fontSize="small" />
            </IconOptions>
            <IconOptions>
              <AddToDriveOutlined fontSize="small" />
            </IconOptions>
            <IconOptions>
              <InsertPhotoOutlined fontSize="small" />
            </IconOptions>
            <IconOptions>
              <LockOutlined fontSize="small" />
            </IconOptions>
            <IconOptions>
              <FontAwesomeIcon icon={faPenClip} fontSize="medium" />
            </IconOptions>
            <IconOptions>
              <MoreVertOutlined fontSize="small" />
            </IconOptions>
          </Box>
        </Box>
        <IconButton onClick={(e) => closeComposeMail(e)}>
          <FontAwesomeIcon icon={faTrashCan} fontSize="medium" />
        </IconButton>
      </Footer>
    </Dialog>
  );
};

export default ComposeMail;
