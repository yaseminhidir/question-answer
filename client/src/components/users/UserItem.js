import { CardActions, Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";

import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Typography } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import axios from "axios";

const UserItem = ({ user, getUsers, blockErrorHandler }) => {
  var loginUser = useSelector((state) => state.authReducer);
  console.log(loginUser);
  async function blockUser(user) {
    try {
      var res = await axios.get(
        "http://localhost:5000/api/admin/block/" + user._id
      );
      getUsers();
    } catch (error) {
      blockErrorHandler(error.response.data.message);
    }
  }
  return (
    <Box>
      {loginUser != null ? (
        <Card>
          <CardContent>
            <Grid
              container
              spacing={{ xs: 1, md: 2 }}
              columns={{ xs: 12, sm: 12, md: 12, xl: 12 }}
            >
              <Grid item xs={3} sm={3} md={3} xl={3}>
                <CardMedia
                  sx={{
                    marginBottom: "15px",
                    maxHeight: "100px",
                    maxWidth: "75px",
                  }}
                  component="img"
                  image={"http://localhost:5000/" + user.profile_image}
                  alt="green iguana"
                />
              </Grid>
              <Grid item xs={9} sm={9} md={9} xl={9}>
                <Typography variant="body1" component="div">
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.title}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          {loginUser.role == "admin" && (
            <CardActions>
              {user.blocked === false ? (
                <BlockIcon
                  sx={{ color: "red", cursor: "pointer" }}
                  onClick={() => blockUser(user)}
                ></BlockIcon>
              ) : (
                <Typography
                  variant="body2"
                  color="text.success"
                  onClick={() => blockUser(user)}
                  sx={{ cursor: "pointer" }}
                >
                  Unblock
                </Typography>
              )}
            </CardActions>
          )}
        </Card>
      ) : (
        <Card>
          <CardContent>
            <Grid
              container
              spacing={{ xs: 1, md: 2 }}
              columns={{ xs: 12, sm: 12, md: 12, xl: 12 }}
            >
              <Grid item xs={3} sm={3} md={3} xl={3}>
                <CardMedia
                  sx={{
                    marginBottom: "15px",
                    maxHeight: "100px",
                    maxWidth: "75px",
                  }}
                  component="img"
                  image={"http://localhost:5000/" + user.profile_image}
                  alt="green iguana"
                />
              </Grid>
              <Grid item xs={9} sm={9} md={9} xl={9}>
                <Typography variant="body1" component="div">
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.title}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default UserItem;
