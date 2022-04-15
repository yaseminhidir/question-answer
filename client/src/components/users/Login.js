import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import * as allActions from "../../redux/actions/authActions";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  var error = useSelector((state) => state.authErrorReducer);

  const [user, setUser] = useState({ name: "", password: "", email: "" });
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState();
  const [errorForgotPassword, setErrorForgotPassword] = useState(false);
  const dispatch = useDispatch();

  function login() {
    console.log("login clicked");
    allActions.login(user)(dispatch);
  }
  function onChangeHandler(event) {
    var { name, value } = event.target;
    var newUser = { ...user, [name]: value };
    setUser(newUser);
  }

  async function forgotPassword() {
    try {
    
      var res = await axios.post(
        "http://localhost:5000/api/auth/forgotpassword/",
        user
      );
      console.log(res.data)
      setSuccess(true);
      setErrorForgotPassword(false);
      setMessage(res.data.message);
    } catch (error) {
      setErrorForgotPassword(true);
      setMessage(error.response.data.message);
      setSuccess(false);
      console.log(error.response.data.message);
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {error != null && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error"> {error} </Alert>
          </Stack>
        )}
        {errorForgotPassword === true && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error"> {message} </Alert>
          </Stack>
        )}
        {success === true && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success"> {message} </Alert>
          </Stack>
        )}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={onChangeHandler}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={onChangeHandler}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              onClick={(e) => login()}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link onClick={() => forgotPassword()}>Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
