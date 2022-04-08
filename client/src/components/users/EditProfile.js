import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Loading from "../Loading";

const EditProfile = () => {
  const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
    website: "",
    title: "",
    about: "",
    place: "",
  });

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  async function getUser() {
    var res = await axios.get("http://localhost:5000/api/auth/profile");
    setUser(res.data.data);
  setLoading(true);
  }
  function onChangeHandler(event) {
    var { name, value } = event.target;
    var newUser = { ...user, [name]: value };
    setUser(newUser);
    console.log(newUser)
  }
  async function editUser() {
    try {
      var res = await axios.put("http://localhost:5000/api/auth/edit", user
      );
      console.log("edit" + res.data.data);
      setLoading(true);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  }
  useEffect(() => {
    getUser();
  }, []);
  if (!loading) {
    return <Loading></Loading>;
  }
  return (
    <Box
      sx={{
        flexDirection: "column",
      }}
    >
      {error != null && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error"> {error} </Alert>
        </Stack>
      )}
      <Card>
        <CardContent>
          <Typography variant="h5">Edit</Typography>
          <Box noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Typography
                  gutterBottom
                  variant="body2"
                  color="text.secondary"
                  component="div"
                >
                  Name
                </Typography>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  autoFocus
                  size="small"
                  onChange={onChangeHandler}
                  value={user.name || ""}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography
                  gutterBottom
                  variant="body2"
                  color="text.secondary"
                  component="div"
                >
                  Email
                </Typography>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  size="small"
                  onChange={onChangeHandler}
                  value={user.email || ""}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  gutterBottom
                  variant="body2"
                  color="text.secondary"
                  component="div"
                >
                  Title
                </Typography>
                <TextField
                  fullWidth
                  name="title"
                  type="title"
                  id="title"
                  size="small"
                  onChange={onChangeHandler}
                  value={user.title || ""}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  gutterBottom
                  variant="body2"
                  color="text.secondary"
                  component="div"
                >
                  Place
                </Typography>
                <TextField
                  fullWidth
                  name="place"
                  type="place"
                  id="place"
                  size="small"
                  onChange={onChangeHandler}
                  value={user.place || ""}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  gutterBottom
                  variant="body2"
                  color="text.secondary"
                  component="div"
                >
                  Website
                </Typography>
                <TextField
                  fullWidth
                  name="website"
                  type="website"
                  id="website"
                  size="small"
                  onChange={onChangeHandler}
                  value={user.website || ""}
                />
              </Grid>
              <Grid item xs={12} sx={{ padding: "15px" }}>
                <Typography
                  gutterBottom
                  variant="body2"
                  color="text.secondary"
                  component="div"
                >
                  About Me
                </Typography>
                <TextField
                  id="about"
                  multiline
                  rows={7}
                  sx={{ width: "100vw" }}
                  size="small"
                  onChange={onChangeHandler}
                  value={user.about || ""}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => editUser()}
            >
              Save
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditProfile;
