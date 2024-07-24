import React from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import {
  ArchiveOutlined,
  ArrowBack,
  DeleteOutlined,
  DraftsOutlined,
  DriveFileMoveOutlined,
  MoreVert,
  ReportGmailerrorredOutlined,
} from "@mui/icons-material";
import styled from "@emotion/styled";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.urls";
const IconWrapper = styled(Box)({
  padding: "22px",
});
const Subject = styled(Typography)({
  display: "flex",
  fontSize: "30px",
  margin: "10px 0 25px 75px",
});
const Indicator = styled(Box)({
  fontSize: "10px",
  background: "#ddd",
  color: "#222",
  padding: "2px 5px",
  marginLeft: "10px",
  borderRadius: "4px",
  alignSelf: "center",
});
const Container = styled(Box)({
  marginLeft: "20px",
  width: "100%",
  "& > div": {
    display: "flex",
    "& > p > span": {
      fontSize: "12px",
      color: "#5E5E5E",
    },
  },
});
const Wrapper = styled(Box)({
  width: "100%",
  marginLeft: "20px",
  display: "flex",
});
const Date = styled(Box)({
  margin: "0 50px 0 auto",
  color: "#5E5E5E",
});
const ViewEmail = () => {
  const { openDrawer } = useOutletContext();
  const { state } = useLocation();
  const { email } = state;
  const moveEmailsToTrashService = useApi(API_URLS.moveEmailsToTrash);
  const deleteSelectedEmail = () => {
    moveEmailsToTrashService.call([email._id]);
    window.history.back();
  };
  return (
    <>
      <Box
        style={
          openDrawer
            ? { marginLeft: "250px", marginRight: "35px" }
            : { marginLeft: "75px", marginRight: "35px" }
        }
      >
        <Box
          sx={{
            marginTop: "4px",
            marginLeft: "6px",
          }}
        >
          <IconButton onClick={() => window.history.back()}>
            <ArrowBack fontSize="small" sx={{ margin: "0 16px 0 0px" }} />
          </IconButton>
          <IconButton sx={{ margin: "2px 10px 10px 8px" }}>
            <ArchiveOutlined fontSize="small" />
          </IconButton>
          <IconButton sx={{ margin: "2px 10px 10px 8px" }}>
            <ReportGmailerrorredOutlined fontSize="small" />
          </IconButton>
          <IconButton
            sx={{ margin: "2px 10px 10px 8px" }}
            onClick={deleteSelectedEmail}
          >
            <DeleteOutlined fontSize="small" />
          </IconButton>
          <IconButton sx={{ margin: "2px 10px 10px 8px" }}>
            <DriveFileMoveOutlined fontSize="small" />
          </IconButton>
          <IconButton sx={{ margin: "2px 10px 10px 8px" }}>
            <DraftsOutlined fontSize="small" />
          </IconButton>
          <IconButton sx={{ margin: "2px 10px 10px 8px" }}>
            <MoreVert fontSize="small" />
          </IconButton>
        </Box>
        <Subject>
          {email.subject}
          <Indicator component="span">inbox</Indicator>
        </Subject>
        <Box sx={{ display: "flex", marginLeft: "20px" }}>
          <Avatar />

          <Container>
            <Box>
              <Typography sx={{ marginTop: "8px" }}>
                {email.name}
                <Box component="span">&nbsp;&#60;{email.to}&#62;</Box>
              </Typography>
              <Date>
                {new window.Date(email.date).getDate()}&nbsp;
                {new window.Date(email.date).toLocaleDateString("default", {
                  month: "long",
                })}
                &nbsp;
                {new window.Date(email.date).getFullYear()}
              </Date>
            </Box>

            <Typography sx={{ marginTop: "40px" }}>{email.body}</Typography>
          </Container>
        </Box>
        <Box>
          {/* <Typography sx={{ marginTop: "40px" }}>{email.body}</Typography> */}
        </Box>
      </Box>
    </>
  );
};

export default ViewEmail;
