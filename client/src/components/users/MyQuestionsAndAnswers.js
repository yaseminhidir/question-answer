import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import axios from "axios";
import { Card } from "@mui/material";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Loading from "../Loading";
import { CardHeader, CardContent } from "@mui/material";
import moment from "moment/min/moment-with-locales";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

const MyQuestionsAndAnswers = () => {
  const [value, setValue] = React.useState("tab1");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const [errorAnswer, setErrorAnswer] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    load();
  };

  useEffect(async () => {
    // İlk açıldığında value = 1
    if (value == "tab1") {
      getQuestionsByUser();
      setLoading(true);
    } else load();
  }, []);

  async function getQuestionsByUser() {
    var resQuestion = await axios.get(
      "http://localhost:5000/api/questions/getQuestionsByUserId"
    );
    setQuestions(resQuestion.data.data);
  }
  async function getAnswersByUser() {
    var resAnswer = await axios.get(
      "http://localhost:5000/api/users/getAnswersByUserId"
    );
    setAnswers(resAnswer.data.data);

    console.log("answers", answers);
  }
  async function load() {
    if (value == "tab2") {
      getQuestionsByUser();
      setLoading(true);
      setSuccess(false);
      setError(false);
    }
    if (value == "tab1") {
      getAnswersByUser();
      setLoading(true);
      setSuccess(false);
      setError(false);
    }
  }
  async function deleteQuestion(question) {
    try {
      var res = await axios.delete(
        "http://localhost:5000/api/questions/" + question._id + "/delete"
      );
      getQuestionsByUser();
      setLoading(true);
      setSuccess(res.data.success);
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error);
      setError(true);
      setSuccess(false);
    }
  }

  async function deleteAnswer(answer) {
    try {
      var res = await axios.delete(
        "http://localhost:5000/api/questions/" +
          answer.question._id +
          "/answers/" +
          answer._id +
          "/delete"
      );
      getAnswersByUser();
      setLoading(true);
      setSuccess(res.data.success);
      setMessage(res.data.message);
    } catch (error) {
      console.log(error);
      setError(true);
      setSuccess(false);
    }
  }
  function onChangeHandler(event, answer) {
    var newAnswers = [...answers];
    var answerIndex = newAnswers.indexOf(answer);
    var { name, value } = event.target;
    newAnswers[answerIndex] = { ...answer, [name]: value };
    console.log(newAnswers[answerIndex]);
    setAnswers(newAnswers);
  }

  async function updateAnswer(answer) {
    // {{URL}}/api/questions/625729796f1604b40b5f8118/answers/625729836f1604b40b5f8122/edit
    try {
      var res = await axios.put(
        "http://localhost:5000/api/questions/" +
          answer.question._id +
          "/answers/" +
          answer._id +
          "/edit",
        answer
      );
      var newAnswers = [...answers];
      var answerIndex = newAnswers.indexOf(answer);
      newAnswers[answerIndex] = {
        ...answer,
        editting: false,
      };
      setAnswers(newAnswers);
      setSuccess(res.data.success);
      setMessage("Answer updated succesfully");
      setError(false);
      getAnswersByUser();
   
    } catch (error) {
      setMessage(error.response.data.message);
      setError(true);
      setSuccess(false);
    }
  }

  function editAnswer(answer) {
    var newAnswers = [...answers];
    var answerIndex = newAnswers.indexOf(answer);
    newAnswers[answerIndex] = {
      ...answer,
      editting: true,
    };
    setAnswers(newAnswers);
    console.log(newAnswers);
    console.log("clicked");
  }

  if (!loading) {
    return <Loading></Loading>;
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab value="tab1" label="My questions" />
        <Tab value="tab2" label="My answers" />
      </Tabs>{" "}
      {success == true && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success"> {message} </Alert>
        </Stack>
      )}
      {error == true && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="warning"> {message} </Alert>
        </Stack>
      )}
      {value == "tab1" ? (
        <Card sx={{ paddingLeft: "10px" }}>
          {questions &&
            questions.map((question) => (
              <Box key={question._id} sx={{ marginTop: "10px" }}>
                <Typography
                  sx={{ fontSize: 14, fontWeight: "bold" }}
                  color="text.secondary"
                  gutterBottom
                >
                  {question.title}
                </Typography>
                {loading ? (
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
                            <Typography
                              sx={{ fontSize: 12 }}
                              color="text.secondary"
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
                        <Grid
                          item
                          xs={8}
                          sx={{
                            lineHeight: "0.01",
                            paddingTop: "0px !important",
                          }}
                        >
                          <Box>
                            <Typography
                              sx={{ fontSize: 12 }}
                              color="text.secondary"
                            >
                              {question.content}
                            </Typography>
                            <Typography
                              sx={{ fontSize: 12 }}
                              color="text.secondary"
                            >
                              {new Intl.DateTimeFormat(
                                window.navigator.language,
                                {
                                  dateStyle: "long",
                                  timeStyle: "short",
                                }
                              ).format(moment(question.createdAt).toDate())}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={2}
                          sx={{
                            justifyContent: "end",
                            display: "flex",
                            alignItems: "end",
                          }}
                        >
                          <Link to={"/editquestion/" + question._id}>
                            <EditIcon color="action"></EditIcon>{" "}
                          </Link>
                          <Box>
                            <DeleteIcon
                              color="warning"
                              sx={{ cursor: "pointer" }}
                              onClick={() => deleteQuestion(question)}
                            ></DeleteIcon>{" "}
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>

                    <Divider />
                  </Card>
                ) : (
                  <Loading></Loading>
                )}
              </Box>
            ))}
        </Card>
      ) : (
        <Card sx={{ padding: "10px" }}>
       
          {answers &&
            answers.map((answer) => (
              <Box key={answer._id} sx={{ marginTop: "10px" }}>
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
                          <Typography
                            sx={{ fontSize: 12 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            {answer.likeCount} likes
                          </Typography>{" "}
                          <br></br>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={8}
                        sx={{ lineHeight: "0.1", paddingTop: "0px !important" }}
                      >
                        <Box>
                          <Typography
                            sx={{ fontSize: 12, mb: 1.5 }}
                            color="text.secondary"
                          >
                            {answer.content}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={2}
                        sx={{
                          justifyContent: "end",
                          display: "flex",
                          alignItems: "end",
                        }}
                      >
                        <Box>
                          <EditIcon
                            color="warning"
                            sx={{ cursor: "pointer" }}
                            onClick={() => editAnswer(answer)}
                          ></EditIcon>{" "}
                          <DeleteIcon
                            color="warning"
                            sx={{ cursor: "pointer" }}
                            onClick={() => deleteAnswer(answer)}
                          ></DeleteIcon>{" "}
                        </Box>
                      </Grid>
                      {answer.editting && (
                        <Box>
                          {" "}
                          <TextField
                            id="answer"
                            multiline
                            rows={7}
                            sx={{ width: "100vw" }}
                            size="small"
                            value={answer.content}
                            name="content"
                            onChange={(event) => onChangeHandler(event, answer)}
                          />
                          <Button onClick={() => updateAnswer(answer)}>
                            Save
                          </Button>
                        </Box>
                      )}
                    </Grid>
                  </CardContent>

                  <Divider />
                </Card>
              </Box>
            ))}
        </Card>
      )}
    </Box>
  );
};
export default MyQuestionsAndAnswers;
