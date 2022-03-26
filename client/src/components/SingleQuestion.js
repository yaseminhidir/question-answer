import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Loading from "./Loading";
import { CKEditor } from "ckeditor4-react";
import { CardActions, CardHeader } from "@mui/material";
import { FavoriteBorderSharp } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const SingleQuestion = () => {
  let { questionId } = useParams();
  const [question, setQuestion] = useState({ answers: [] });
  const [success, setSuccess] = useState(true);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      var res = await axios.get(
        "http://localhost:5000/api/questions/" + questionId
      );
      setQuestion(res.data.data[0]);
      setSuccess(res.data.success);
      setLoading(false);
    } catch (error) {
      console.log("error response", error.response.data);
      setSuccess(error.response.data.success);
      setMessage(error.response.data.message);
    }
  }
  useEffect(async () => {
    load();
  }, [questionId]);

  if (!success) {
    return (
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="error"> {message} </Alert>
      </Stack>
    );
  }
  if (loading) {
    return <Loading></Loading>;
  }
  async function likeQuestionFunc() {
    try {
      if (!question.likedByCurrentUser) {
        var res = await axios.post(
          "http://localhost:5000/api/questions/" + questionId + "/like"
        );
        load();
      } else {
        var res = await axios.post(
          "http://localhost:5000/api/questions/" + questionId + "/undo_like"
        );

        load();
      }
    } catch (error) {
      console.log("error response like question", error.response.data);
      setSuccess(error.response.data.success);
      setMessage(error.response.data.message);
    }
  }
  async function likeAnswerFunc(answerId) {
    try {
      var answer = question.answers.find((x) => x.id === answerId);
      if (!answer.likedByCurrentUser) {
        var res = await axios.post(
          "http://localhost:5000/api/questions/" +
            questionId +
            "/answers/" +
            answerId +
            "/like"
        );
        load();
      } else {
        var res = await axios.post(
          "http://localhost:5000/api/questions/" +
            questionId +
            "/answers/" +
            answerId +
            "/undo_like"
        );
        load();
      }
    } catch (error) {
      console.log("error response like answer", error.response.data);
      setSuccess(error.response.data.success);
      setMessage(error.response.data.message);
    }
  }
  return (
    <Box>
      <Typography
        sx={{ fontSize: 14, fontWeight: "bold" }}
        color="text.secondary"
        gutterBottom
      >
        {question.title}
      </Typography>
      <Card sx={{ marginBottom: "10px" }}>
        <CardHeader></CardHeader>
        <CardContent>
          <Grid container spacing={2}>
            <Grid
              item
              xs={2}
              sx={{ justifyContent: "end", display: "flex", lineHeight: "0.1" }}
            >
              <Box>
                {" "}
                <Typography
                  sx={{ fontSize: 12 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {question.likeCount} likes
                </Typography>{" "}
                <br></br>
                <Typography
                  sx={{ fontSize: 12 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {question.answerCount} answers
                </Typography>{" "}
              </Box>
            </Grid>
            <Grid item xs={10} sx={{ lineHeight: "0.1" }}>
              <Box>
                <Typography
                  sx={{ fontSize: 12, mb: 1.5 }}
                  color="text.secondary"
                >
                  {question.content}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          {" "}
          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
            {" "}
            {question.user.name} - {question.user.email}
          </Typography>
          {question.likedByCurrentUser ? (
            <FavoriteIcon
              onClick={() => likeQuestionFunc()}
              sx={{ marginLeft: "auto", cursor: "pointer", color: "red" }}
            ></FavoriteIcon>
          ) : (
            <FavoriteBorderOutlinedIcon
              color={"red"}
              onClick={() => likeQuestionFunc()}
              sx={{ marginLeft: "auto", cursor: "pointer" }}
            ></FavoriteBorderOutlinedIcon>
          )}
        </CardActions>
        <Divider />
      </Card>
      <Typography
        sx={{ fontSize: 14, textTransform: "uppercase" }}
        color="text.secondary"
        gutterBottom
      >
        {question.answerCount} Answers
      </Typography>
      {question.answers.map((answer) => (
        <Card key={answer._id} sx={{ marginBottom: "10px" }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid
                item
                xs={2}
                sx={{
                  justifyContent: "end",
                  display: "flex",
                  lineHeight: "0.1",
                }}
              >
                <Box>
                  {" "}
                  <Typography
                    sx={{ fontSize: 12 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {question.likeCount} likes
                  </Typography>{" "}
                </Box>
              </Grid>

              <Grid item xs={10} sx={{ lineHeight: "0.1" }}>
                <Box>
                  <Typography
                    sx={{ fontSize: 12, mb: 1.5 }}
                    color="text.secondary"
                  >
                    {answer.content}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>

          <CardActions>
            {" "}
            <Typography
              sx={{ fontSize: 12 }}
              color="text.secondary"
              gutterBottom
            >
              {" "}
              {answer.user.name} - {answer.user.email}
            </Typography>
            {answer.likedByCurrentUser ? (
              <FavoriteIcon
                onClick={() => likeAnswerFunc(answer._id)}
                sx={{ marginLeft: "auto", cursor: "pointer", color: "red" }}
              ></FavoriteIcon>
            ) : (
              <FavoriteBorderOutlinedIcon
                color={"red"}
                onClick={() => likeAnswerFunc(answer._id)}
                sx={{ marginLeft: "auto", cursor: "pointer" }}
              ></FavoriteBorderOutlinedIcon>
            )}
          </CardActions>
          <Divider />
        </Card>
      ))}
      <Card>
        <Typography
          sx={{ fontSize: 14, textTransform: "uppercase" }}
          color="text.secondary"
          gutterBottom
        >
          Your Answer
        </Typography>
        <CKEditor />
      </Card>
    </Box>
  );
};

export default SingleQuestion;
