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
import Loading from "../Loading";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CardActions, CardHeader } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PaginationComponent from "../PaginationComponent";

const SingleQuestion = () => {
  let { questionId } = useParams();
  const [question, setQuestion] = useState({ answers: [] });
  const [message, setMessage] = useState();
  const [success, setSuccess] = useState(false);
  const [answerMessage, setAnswerMessage] = useState();
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState();
  const [currentPage, setCurrentPage] = useState({});
  const [answer, setAnswer] = useState({ content: "" });

  function onPageChange(event, new_page) {
    setCurrentPage(new_page);
    console.log(new_page);
  }
  const user = useSelector((state) => state.authReducer);
  async function load() {
    try {
      setLoading(true);
      var res = await axios.get(
        "http://localhost:5000/api/questions/" + questionId,
        { params: { page: currentPage, limit: 5 } }
      );
      console.log(res.data.data);
      setQuestion(res.data.data[0]);
      console.log(res.data.pagination);
      setPagination(res.data.pagination);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setMessage(error.response.data.message);
    }
  }
  useEffect(async () => {
    load();
  }, [questionId, currentPage]);

  if (loading) {
    return <Loading></Loading>;
  }
  async function likeQuestionFunc() {
    try {
      if (!question.likedByCurrentUser) {
        setLoading(true);
        await axios.post(
          "http://localhost:5000/api/questions/" + questionId + "/like"
        );
        load();
      } else {
        setLoading(true);
        await axios.post(
          "http://localhost:5000/api/questions/" + questionId + "/undo_like"
        );

        load();
      }
    } catch (error) {
      console.log("error response like question", error.response.data);
      setLoading(false);
      setMessage(error.response.data.message);
    }
  }
  async function likeAnswerFunc(answerId) {
    try {
      var answer = question.answers.find((x) => x.id === answerId);
      var newAnswers = [...question.answers];
      var answerIndex = newAnswers.indexOf(answer);
      newAnswers[answerIndex] = {
        ...answer,
        loading: true,
      };
      var newQuestion = {
        ...question,
        answers: newAnswers,
      };
      setQuestion(newQuestion);

      var updateAnswer = null;
      if (!answer.likedByCurrentUser) {
        await axios.post(
          "http://localhost:5000/api/questions/" +
            questionId +
            "/answers/" +
            answerId +
            "/like"
        );
        updateAnswer = {
          likedByCurrentUser: true,
        };
      } else {
        await axios.post(
          "http://localhost:5000/api/questions/" +
            questionId +
            "/answers/" +
            answerId +
            "/undo_like"
        );
        updateAnswer = {
          likedByCurrentUser: false,
        };
      }
      newAnswers[answerIndex] = {
        ...answer,
        ...updateAnswer,
        loading: false,
      };

      var newQuestion = {
        ...question,
        answers: newAnswers,
      };
      setQuestion(newQuestion);
    } catch (error) {
      console.log("error response like answer", error.response.data);
      setLoading(false);
      setMessage(error.response.data.message);
    }
  }
  function onChangeHandler(event) {
    var { name, value } = event.target;
    var newAnswer = { ...answer, [name]: value };
    setAnswer(newAnswer);
  }
  async function AddAnswer() {
    try {
      setLoading(true);
      var res = await axios.post(
        "http://localhost:5000/api/questions/" + question.id + "/answers",
        answer
      );
      console.log(res);
      setAnswerMessage("Succesfully added");
      setSuccess(true);
      setMessage(null);
      load();
    } catch (error) {
      setLoading(false);
      setMessage(error.response.data.message);
    }
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
      {message != null && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error"> {message} </Alert>
        </Stack>
      )}
      {success === true && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success"> {answerMessage} </Alert>
        </Stack>
      )}
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
              sx={{
                justifyContent: "end",
                display: "flex",
                lineHeight: "0.1",
                paddingTop: "0px !important",
              }}
            >
              <Box>
                {" "}
                <Typography sx={{ fontSize: 12 }} color="text.secondary">
                  {question.likeCount} likes
                </Typography>{" "}
                <br></br>
                <Typography sx={{ fontSize: 12 }} color="text.secondary">
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
          {answer.loading == true && <Loading></Loading>}
          <CardContent>
            <Grid container spacing={2}>
              <Grid
                item
                xs={2}
                sx={{
                  justifyContent: "end",
                  display: "flex",
                  lineHeight: "0.1",
                  paddingTop: "0px !important",
                }}
              >
                <Box>
                  {" "}
                  <Typography sx={{ fontSize: 12 }} color="text.secondary">
                    {answer.likeCount} likes
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
        <TextField
          id="about"
          multiline
          rows={7}
          sx={{ width: "100vw" }}
          size="small"
          value={answer.content}
          name="content"
          onChange={onChangeHandler}
        />
        <Grid container spacing={2} sx={{ padding: "10px" }}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4} sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              onClick={() => AddAnswer()}
              variant="contained"
              size="small"
            >
              Post your Answer
            </Button>
          </Grid>
        </Grid>
      </Card>

      <PaginationComponent
        onPageChange={onPageChange}
        pagination={pagination}
      ></PaginationComponent>
    </Box>
  );
};

export default SingleQuestion;
