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
import { useParams } from "react-router-dom";

const AskQuestion = () => {
  const [question, setQuestion] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);

  let { id } = useParams();
  var questionId = id || 0;

  useEffect(async () => {
    setLoading(true);
    if (questionId != 0) {
      var res = await axios.get(
        "http://localhost:5000/api/questions/" + questionId
      );
      setQuestion(res.data.data[0]);
    }
  }, []);

  function onChangeHandler(event) {
    var { name, value } = event.target;
    var newQuestion = { ...question, [name]: value };
    setQuestion(newQuestion);
    console.log(newQuestion);
  }
  async function askNewQuestion() {
    if ((questionId == 0)) {
      try {
        setLoading(false);
        var res = await axios.post(
          "http://localhost:5000/api/questions/ask",
          question
        );
        setLoading(true);
        setSuccess(true);
        setError(null);
        setQuestion({title:"", content:""});
      } catch (error) {
        setError(error.response.data.message);
        setSuccess(false);
      }
    }

    if (questionId != 0) {
      try {
     
        var res = await axios.put(
          "http://localhost:5000/api/questions/"+
          questionId+
          "/edit", question
        );

        setSuccess(true);
        setError(null);
      } catch (error) {
        setError(error.response.data.message);
        setSuccess(false);
      }
    }
  }
  if (!loading) {
    return <Loading></Loading>;
  }
  return (
    
    <Box
      sx={{
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Ask a public question
      </Typography>
      <Card>
        {error != null && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error"> {error} </Alert>
          </Stack>
        )}
        {success == true && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">
              {" "}
              "Your question succesfully posted"{" "}
            </Alert>
          </Stack>
        )}
        <CardContent>
          <Box noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Typography
                  gutterBottom
                  variant="body2"
                  color="text.secondary"
                  component="div"
                >
                  Title
                </Typography>
                <TextField
                  autoComplete="given-name"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  autoFocus
                  size="small"
                  onChange={onChangeHandler}
                  value={question.title || ""}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography
                  sx={{ fontSize: 14, textTransform: "uppercase" }}
                  color="text.secondary"
                  gutterBottom
                >
                  Content
                </Typography>
                <TextField
                  id="about"
                  multiline
                  rows={7}
                  sx={{ width: "100vw" }}
                  size="small"
                  value={question.content}
                  name="content"
                  onChange={onChangeHandler}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => askNewQuestion()}
            >
              Review your question
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AskQuestion;
