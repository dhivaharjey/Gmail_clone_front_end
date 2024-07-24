import {
  AccessTimeOutlined,
  DeleteOutline,
  Scale,
  StarBorderOutlined,
  StarRate,
  StarRateRounded,
  StarRounded,
} from "@mui/icons-material";
import { Box, Checkbox, IconButton, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { routes } from "../routers/routes";
import ViewEmail from "./ViewEmail";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.urls";
const Wrapper = styled(Box)({
  margin: "0px",
  padding: "0 0 0 11px",
  background: "#f2f6fc",
  display: "flex",
  cursor: "pointer",
  alignItems: "center",
  borderBottom: ".5px solid #DCDCDC",
  "&:hover": {
    zIndex: "5",
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
    marginBottom: "1px",
  },
  "& > div": {
    display: "flex",
    width: "100%",
    "& > p": {
      fontSize: "14px",
    },
  },
});
const Indicator = styled(Typography)({
  fontSize: "10px !important ",
  background: "#ddd",
  color: "#zzz",
  padding: "2px 3px",
  borderRadius: "4px",
  marginRight: "6px",
});
const Date = styled(Typography)({
  marginLeft: "auto",
  marginRight: "20px",
  fontSize: "12px ",
  color: "#5F6368",
});
const Email = ({
  email,
  selectedEmails,
  setSelectedEmails,
  setRefreshScreen,
  setChecked,
}) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { type } = useParams();
  const toggleStarredService = useApi(API_URLS.toggleStarredEmail);
  const toggleSnoozedService = useApi(API_URLS.toggleSnoozedEmail);
  const moveEmailsToTrashService = useApi(API_URLS.moveEmailsToTrash);
  // const deleteEmailService = useApi(API_URLS.deleteEmailPermanently);
  const toggleStarredMail = () => {
    toggleStarredService.call({ id: email._id, value: !email.starred });
    setRefreshScreen((prevState) => !prevState);
  };
  const toggleSnoozedEmail = (e) => {
    e.stopPropagation();
    toggleSnoozedService.call({ id: email._id, value: !email.snooze });
    setRefreshScreen((prevState) => !prevState);
  };
  const onValueChange = () => {
    if (selectedEmails.includes(email._id)) {
      setSelectedEmails((prevState) =>
        prevState.filter((id) => id != email._id)
      );
      setChecked(false);
    } else {
      setSelectedEmails((prevState) => [...prevState, email._id]);
      setChecked(true);
    }
  };
  const deleteSelectedEmails = (e) => {
    e.stopPropagation();
    moveEmailsToTrashService.call([email._id]);
    setRefreshScreen((prevState) => !prevState);
  };
  return (
    <>
      <Wrapper
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <Checkbox
          size="small"
          checked={selectedEmails.includes(email._id)}
          onChange={onValueChange}
        />
        {type !== "trash" &&
          (email.starred ? (
            <IconButton
              sx={{ marginLeft: "8px", color: "#FFF200" }}
              onClick={toggleStarredMail}
            >
              <StarRate fontSize="small" />
            </IconButton>
          ) : (
            <IconButton sx={{ marginLeft: "8px" }} onClick={toggleStarredMail}>
              <StarBorderOutlined fontSize="small" />
            </IconButton>
          ))}

        <Box
          onClick={() =>
            navigate(routes.view.path, { state: { email: email } })
          }
        >
          {/* <ViewEmail email={} /> */}
          <Typography
            sx={{ width: "240px", overflow: "hidden", marginLeft: "12px" }}
          >
            {email.name}
          </Typography>
          <Indicator>Inbox</Indicator>
          <Typography>
            {email.subject}
            {email.body && "-"} {email.body}
          </Typography>

          {type !== "trash" && show && (
            <Box component="span" sx={{ marginLeft: "auto" }}>
              <IconButton
                sx={{ padding: "2px", margin: "0" }}
                onClick={deleteSelectedEmails}
              >
                <DeleteOutline fontSize="small" />
              </IconButton>
              <IconButton
                style={{ padding: "2px", margin: "0" }}
                onClick={toggleSnoozedEmail}
              >
                <AccessTimeOutlined fontSize="small" />
              </IconButton>
            </Box>
          )}

          <Date>
            {new window.Date(email.date).getDate()}
            {new window.Date(email.date).toLocaleDateString("default", {
              month: "long",
            })}
          </Date>
        </Box>
      </Wrapper>
    </>
  );
};

export default Email;
