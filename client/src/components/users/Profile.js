import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import moment from "moment/min/moment-with-locales";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import Loading from "../Loading"
import MyQuestionsAndAnswers from "./MyQuestionsAndAnswers";
import {Button} from "@mui/material"

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  async function getUser() {
    var res = await axios.get("http://localhost:5000/api/auth/profile");
    setUser(res.data.data);
    setLoading(true);
  }
  useEffect(() => {
    getUser();
  }, []);
  if(!loading){
    return(<Loading></Loading>)
  }
  return (
    <Box>
       <Button
        to="/newquestion"
        component={Link}
        variant="contained"
        size="small"
        sx={{ marginBottom: "10px" }}
      >
        Ask New Question
      </Button>
      <Card sx={{ padding: "20px" }}>
        <Grid container>
          <Grid item xs={3}>
            <CardMedia
              sx={{ marginBottom: "15px" }}
              component="img"
              height="140"
              image={"http://localhost:5000/" + user.profile_image}
              alt="green iguana"
            />
          </Grid>
          <Grid item xs={7}>
            <CardContent>
              <Typography variant="h5" component="div">
                {user.name}
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                {user.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {user.place}{" "}
                {new Intl.DateTimeFormat(window.navigator.language, {
                  dateStyle: "long",
                  timeStyle: "short",
                }).format(moment(user.createdAt).toDate())}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.website}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={2} sx={{ justifyContent: "end", display: "flex" }}>
            <Link to={"edit"}>
              <EditIcon></EditIcon>{" "}
            </Link>
          </Grid>
          <Grid item xs={11}>
            <Typography variant="body1">About me:</Typography>
            <Typography variant="body2" color="text.secondary">
              {user.about}
            </Typography>
          </Grid>
        </Grid>
      </Card>
      <MyQuestionsAndAnswers></MyQuestionsAndAnswers>
    </Box>
  );
};
export default Profile;
