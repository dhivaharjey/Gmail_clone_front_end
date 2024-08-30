import {
  AccessTimeOutlined,
  AccountCircle,
  AccountCircleOutlined,
  DeleteOutline,
  StarBorderOutlined,
  StarRate,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Checkbox,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { routes } from "../routers/routes";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.urls";
const Wrapper = styled(Box)({
  padding: "0 0 0 11px",
  background: "#f2f6fc",
  display: "flex",
  cursor: "pointer",
  alignItems: "center",
  borderBottom: ".5px solid #DCDCDC",
  marginBottom: "-16px",
  "&:hover": {
    zIndex: 5,
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
    marginBottom: "-15px",
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
  marginLeft: "auto !important",
  paddingRight: "25px",
  fontSize: "12px ",
  color: "#5F6368",
});
const Email = ({
  email,
  selectedEmails = [],
  setSelectedEmails,

  setRefreshScreen,
  setChecked,
  checked,
}) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { type } = useParams();
  const toggleStarredService = useApi(API_URLS.toggleStarredEmail);
  const toggleSnoozedService = useApi(API_URLS.toggleSnoozedEmail);
  const moveEmailsToTrashService = useApi(API_URLS.moveEmailsToTrash);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const toggleStarredMail = () => {
    toggleStarredService.call({ id: email._id, value: !email.starred });

    setTimeout(() => {
      setRefreshScreen((prevState) => !prevState);
    }, 600);
  };
  const toggleSnoozedEmail = (e) => {
    e.stopPropagation();
    toggleSnoozedService.call({ id: email._id, value: !email.snooze });
    setTimeout(() => {
      setRefreshScreen((prevState) => !prevState);
    }, 600);
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
    setTimeout(() => {
      setRefreshScreen((prevState) => !prevState);
    }, 600);
    setChecked(false);
  };
  return (
    <>
      <Wrapper
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <Checkbox
          size="small"
          checked={checked ? selectedEmails.includes(email._id) : false}
          onChange={onValueChange}
          sx={{ display: { xs: "none", sm: "flex" } }}
        />
        {isSmallScreen && (
          <AccountCircle
            color="action"
            fontSize="large"
            alt={email.name}
            sx={{
              width: "30px",
              height: "30px",
            }}
          >
            {email.name.charAt(0)}
          </AccountCircle>
        )}

        {type !== "trash" &&
          (email.starred ? (
            <IconButton
              sx={{
                marginLeft: "8px",
                color: "#FFF200",
                display: { xs: "none", sm: "flex" },
              }}
              onClick={toggleStarredMail}
            >
              <StarRate fontSize="small" />
            </IconButton>
          ) : (
            <IconButton
              sx={{ marginLeft: "8px", display: { xs: "none", sm: "flex" } }}
              onClick={toggleStarredMail}
            >
              <StarBorderOutlined fontSize="small" />
            </IconButton>
          ))}

        <Box
          onClick={() =>
            navigate(routes.view.path, { state: { email: email } })
          }
        >
          <Typography
            sx={{
              width: { xs: "100px", sm: "150px", md: "240px" },
              overflow: "hidden",
              marginLeft: "12px",
            }}
          >
            {email.name}
          </Typography>
          <Indicator sx={{ display: { xs: "none", sm: "flex" } }}>
            Inbox
          </Indicator>
          <Typography sx={{ marginLeft: "2px" }}>
            {email.subject}
            {email.body && "-"} {email.body}
          </Typography>

          {type !== "trash" && show && (
            <Box
              component="span"
              sx={{ marginLeft: "auto", paddingRight: "25px" }}
            >
              <IconButton
                sx={{ padding: "2px", marginRight: "2px" }}
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

          {!show && (
            <Date sx={{ marginLeft: "auto !important" }}>
              {new window.Date(email.date).getDate()}
              {new window.Date(email.date).toLocaleDateString("default", {
                month: "long",
              })}
            </Date>
          )}
        </Box>
      </Wrapper>
    </>
  );
};

export default Email;
