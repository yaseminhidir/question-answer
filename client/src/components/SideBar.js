import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

import MenuItem from "@mui/material/MenuItem";
export default function SwipeableTemporaryDrawer() {
  return (
   
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          <Typography sx={{ minWidth: 100 }}>
            {" "}
            <MenuItem component={Link} to={"/"}>
              <ListItem>Questions</ListItem>
            </MenuItem>{" "}
            <MenuItem component={Link} to={"/users"}>
              <ListItem>Users</ListItem>
            </MenuItem>{" "}
          </Typography>
        </List>
        <Divider />
      </Box>
   
  );
}
