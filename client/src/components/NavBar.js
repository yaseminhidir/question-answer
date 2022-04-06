import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import * as allActions from "../redux/actions/authActions";
import { useDispatch } from "react-redux";

export default function NavBar({ loginUser }) {
  const dispatch = useDispatch();
  function logOutFunc() {
    allActions.logout()(dispatch);
    console.log("logout clicked");
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          marginBottom: "15px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#757ce88c",
          boxShadow: "0px 5px 14px 7px rgba(0,0,0,0.22)",
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "flex", marginLeft: "20px" } }}
        >
          LOGO
        </Typography>

        {loginUser != null ? (
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ marginLeft: "auto", marginRight: "15px" }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>{loginUser.name[0]}</Avatar>
            </IconButton>
          </Tooltip>
        ) : (
          <Box
            sx={{ display: "inherit", marginLeft: "auto", marginRight: "20px" }}
          >
            <MenuItem component={Link} to={"/register"}>
              <ListItem sx={{ paddingLeft: "0px", paddingRight: "0px" }}>
                Register
              </ListItem>
            </MenuItem>{" "}
            <MenuItem component={Link} to={"/login"}>
              <ListItem sx={{ paddingLeft: "0px", paddingRight: "0px" }}>
                Login
              </ListItem>
            </MenuItem>{" "}
          </Box>
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          component={Link}
          to="/profile
        "
        >
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={(e) => logOutFunc()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
