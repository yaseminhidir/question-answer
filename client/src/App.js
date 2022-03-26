import React, {useEffect} from "react";
import NavBar from "./components/NavBar";
import "./App.css";
import RouterView from "./components/RouterView";
import SideBar from "./components/SideBar";
import Grid from "@mui/material/Grid";
import * as allActions from "./redux/actions/authActions"
import { useDispatch} from "react-redux";
import axios from "axios";

function App() {
  const dispatch=useDispatch();
  useEffect(() => {
    async function getUser(){
     var res= await axios.get("http://localhost:5000/api/auth/getuser");
     if(res.data){
      dispatch(allActions.authSuccess(res.data));
     }
    };
    getUser();
  }, [])
  return (
    <div className="App">
       
      <NavBar></NavBar>
      <Grid container spacing={2}>   
        <Grid item xs={3}>
          <SideBar></SideBar>
        </Grid>
        <Grid item xs={8}>
          
      <RouterView></RouterView>
        </Grid>
        </Grid>
    </div>
  );
}

export default App;
