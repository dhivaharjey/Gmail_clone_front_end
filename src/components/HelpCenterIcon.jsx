import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, Divider, IconButton } from "@mui/material";
import { HelpOutlineOutlined } from "@mui/icons-material";

export default function HelpCenterIcon() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <HelpOutlineOutlined />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        slotProps={{
          paper: {
            sx: {
              // marginTop: "12px",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",

              width: "240px",
              marginLeft: "-160px",
            },
          },
        }}
      >
        <MenuItem onClick={handleClose}>Help</MenuItem>
        <MenuItem onClick={handleClose}>Training</MenuItem>
        <MenuItem onClick={handleClose}>Updates</MenuItem>
        <Divider sx={{ my: 1 }} />

        <MenuItem
          slotProps={{ paper: { sx: { padding: "10px" } } }}
          onClick={handleClose}
        >
          Send feedback to Google
        </MenuItem>
      </Menu>
    </div>
  );
}
