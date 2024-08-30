import {
  Box,
  Checkbox,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.urls";
import {
  ArchiveOutlined,
  CreateOutlined,
  DeleteOutline,
  DraftsOutlined,
  DriveFileMoveOutlined,
  MoreVertOutlined,
  RefreshOutlined,
  ReportGmailerrorredOutlined,
} from "@mui/icons-material";
import { Toaster } from "react-hot-toast";

import NoMail from "./NoMail";
import { EMPTY_TABS } from "./constants/emptyMessage";
import InboxEmailLoader from "./Common/InboxEmailLoader";

const EmailContent = lazy(() => import("./Email"));
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MailsPage = () => {
  const [checked, setChecked] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const { openDrawer, setOpenMsgBox, refreshScreen, setRefreshScreen } =
    useOutletContext();
  const { type } = useParams();

  const getEmailService = useApi(API_URLS.getEmailFromType);
  const moveEmailsToTrashService = useApi(API_URLS.moveEmailsToTrash);
  const deleteEmailPermanentlyService = useApi(API_URLS.deleteEmailPermanently);

  const selectedAllEmails = (e) => {
    if (e.target.checked) {
      setChecked(true);
      const emails = getEmailService?.response?.emails?.map(
        (email) => email._id
      );
      setSelectedEmails(emails);
    } else {
      setSelectedEmails([]);
      setChecked(false);
    }
  };
  const handlerefreshClick = () => {
    setTimeout(() => {
      setRefreshScreen((prevState) => !prevState);
    }, 500);

    toast("Loading....", {
      position: "top-center",
      hideProgressBar: true,
      autoClose: 1000,
      closeOnClick: false,
      textAlign: "center",
      style: {
        border: "2px solid #CA8907",
        padding: "-100px",
        color: "black",
        fontWeight: "bold",
        backgroundColor: "#FCCF77",
        borderRadius: "10px",
      },
    });
  };
  const deleteSelectedEmails = (e) => {
    e.stopPropagation();
    if (type === "trash") {
      deleteEmailPermanentlyService.call(selectedEmails);
      setChecked(false);
    } else {
      moveEmailsToTrashService.call(selectedEmails);
      setChecked(false);
    }
    setTimeout(() => {
      setRefreshScreen((prevState) => !prevState);
    }, 500);
  };
  useEffect(() => {
    getEmailService.call({}, type);
  }, [type, refreshScreen]);
  useEffect(() => {
    const hasLoggedIn = localStorage.getItem("hasLoggedIn");
    if (hasLoggedIn) {
      toast.success("Logged in Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
    }
    localStorage.removeItem("hasLoggedIn");
  }, []);
  // console.log(getEmailService.response);
  const emails = getEmailService?.response?.emails || [];
  const isEmpty = emails.length === 0 && !getEmailService.isLoading;

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ToastContainer />
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
            // checked={checked}
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
        <Suspense fallback={<InboxEmailLoader />}>
          <List>
            {emails.map((email) => {
              return (
                <>
                  <List key={email.id}>
                    <EmailContent
                      key={email.id}
                      email={email}
                      selectedEmails={selectedEmails}
                      setSelectedEmails={setSelectedEmails}
                      setRefreshScreen={setRefreshScreen}
                      setChecked={setChecked}
                      checked={checked}
                    />
                  </List>
                </>
              );
            })}
          </List>

          {isEmpty && <NoMail message={EMPTY_TABS[type]} />}
        </Suspense>
      </Box>
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          fontFamily: "Jost",
          position: "absolute",
          bottom: "20px",
          right: "20px",
        }}
      >
        <IconButton
          sx={{
            display: "flex",
            fontFamily: "Jost",
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
      </Box>
    </>
  );
};

export default MailsPage;
