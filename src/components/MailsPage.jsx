import { Box, Checkbox, IconButton, List, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.urls";
import {
  ArchiveOutlined,
  DeleteOutline,
  DeleteOutlineRounded,
  DraftsOutlined,
  DriveFileMoveOutlined,
  MoreVertOutlined,
  RefreshOutlined,
  ReportGmailerrorredOutlined,
} from "@mui/icons-material";
import toast, { Toaster } from "react-hot-toast";
import Email from "./Email";
import NoMail from "./NoMail";
import { EMPTY_TABS } from "./constants/emptyMessage";

const MailsPage = () => {
  const [checked, setChecked] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [refreshScreen, setRefreshScreen] = useState(false);
  const { openDrawer } = useOutletContext();
  const { type } = useParams();
  const getEmailService = useApi(API_URLS.getEmailFromType);
  const moveEmailsToTrashService = useApi(API_URLS.moveEmailsToTrash);
  const deleteEmailPermanentlyService = useApi(API_URLS.deleteEmailPermanently);
  const selectedAllEmails = (e) => {
    if (e.target.checked) {
      setChecked(true);
      const emails = getEmailService?.response?.email?.map(
        (email) => email._id
      );
      setSelectedEmails(emails);
    } else {
      setSelectedEmails([]);
      setChecked(false);
    }
  };
  const handlerefreshClick = () => {
    setRefreshScreen((prevState) => !prevState);
    // toast.success("Loading....");
    toast("Loading....", {
      duration: 1000,
      style: {
        border: "2px solid #CA8907",
        padding: "2px",
        color: "black",
        fontWeight: "bold",
        backgroundColor: "#FCCF77",
        borderRadius: "0px",
      },
    });
  };
  const deleteSelectedEmails = (e) => {
    if (type === "trash") {
      deleteEmailPermanentlyService.call(selectedEmails);
      setChecked(false);
    } else {
      moveEmailsToTrashService.call(selectedEmails);
      setChecked(false);
    }
    setRefreshScreen((prevState) => !prevState);
  };
  useEffect(() => {
    getEmailService.call({}, type);
  }, [type, refreshScreen]);
  // console.log(getEmailService.response);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Box
        style={
          openDrawer
            ? { marginLeft: "250px", width: "calc(100% - 295px)" }
            : { marginLeft: "75px", width: "calc(100% - 120px)" }
        }
      >
        <Box
          sx={{
            display: "flex",

            alignItems: "center",
            padding: "5px 5px 0 2px",
          }}
        >
          <Checkbox
            size="small"
            sx={{ margin: "0 8px 6px 8px" }}
            onChange={selectedAllEmails}
          />

          {checked && (
            <Box>
              <IconButton sx={{ margin: "0 8px 6px 0" }}>
                <ArchiveOutlined fontSize="small" />
              </IconButton>
              <IconButton sx={{ margin: "0 8px 6px 0" }}>
                <ReportGmailerrorredOutlined fontSize="small" />
              </IconButton>
              <IconButton
                sx={{ margin: "0 8px 6px 0" }}
                onClick={deleteSelectedEmails}
              >
                <DeleteOutline fontSize="small" />
              </IconButton>
              <IconButton sx={{ margin: "0 8px 6px 0" }}>
                <DriveFileMoveOutlined fontSize="small" />
              </IconButton>
              <IconButton sx={{ margin: "0 8px 6px 0" }}>
                <DraftsOutlined fontSize="small" />
              </IconButton>
            </Box>
          )}
          {!checked && (
            <Box>
              <IconButton
                sx={{ margin: "0 8px 6px 0" }}
                onClick={handlerefreshClick}
              >
                <RefreshOutlined fontSize="small" />
              </IconButton>
              <IconButton sx={{ margin: "0 8px 6px 0" }}>
                <MoreVertOutlined fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>
        <Box>
          <List>
            {getEmailService?.response?.email?.map((email) => {
              return (
                <>
                  <Email
                    key={email._id}
                    email={email}
                    selectedEmails={selectedEmails}
                    setSelectedEmails={setSelectedEmails}
                    setRefreshScreen={setRefreshScreen}
                    setChecked={setChecked}
                  />
                </>
              );
            })}
          </List>
          {getEmailService?.response?.email?.length === 0 && (
            <NoMail message={EMPTY_TABS[type]} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default MailsPage;
