import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import "./App.css";
import RouterView from "./components/RouterView";
import SideBar from "./components/SideBar";
import Grid from "@mui/material/Grid";
import * as allActions from "./redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loading from "../src/components/Loading";


function App() {
  var loginUser = useSelector((state) => state.authReducer);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getUser() {
      var res = await axios.get("http://localhost:5000/api/auth/getuser");
      if (res.data) {
        dispatch(allActions.authSuccess(res.data));
      }
      console.log(res);
    }
    getUser();
    setLoading(false);
  }, []);
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="App">
      <NavBar loginUser={loginUser}></NavBar>
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        columns={{ xs: 12, sm: 12, md: 12, xl: 12 }}
      >
        <Grid item xs={12} md={3} sm={4} lg={3}>
          <SideBar></SideBar>
        </Grid>

        <Grid item xs={12} md={8} sm={8} lg={8}>
          {" "}
       
          <RouterView></RouterView>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
