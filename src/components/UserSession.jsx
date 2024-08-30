import { Button, Dialog, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth/AuthContext";

const UserSession = () => {
  const navigate = useNavigate();
  const { isTokenExpired, setIsTokenExpired } = useAuth();
  const handleLoginRedirect = () => {
    setIsTokenExpired(false);
    navigate("/login");
  };

  return (
    <Dialog
      open={isTokenExpired ? true : false}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "400px",
            height: "200px",
            borderRadius: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            border: "1px solid red",
            backgroundColor: "#C0C0C0",
          },
        },
      }}
      aria-labelledby="customized-dialog-title"
    >
      <Typography
        sx={{
          color: "red",
          fontSize: "28px",
          marginBottom: "10px",
          fontWeight: "bold",
        }}
      >
        Your Session has Expired
      </Typography>
      <Button
        onClick={handleLoginRedirect}
        sx={{
          marginTop: "5px",
          textDecoration: "none",
          fontSize: "16px",
          color: "#333",
          cursor: "pointer",
          padding: "10px 15px",
          border: "1px solid red",
          borderRadius: "20px",
          backgroundColor: "#CCFFFF",
          "&:hover": {
            color: "#fff",
            backgroundColor: "#00CCCC",
          },
        }}
      >
        Log In
      </Button>
    </Dialog>
  );
};

export default UserSession;
