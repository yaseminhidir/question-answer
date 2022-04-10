import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import axios from "axios";
import PaginationComponent from "../PaginationComponent";
import { Card } from "@mui/material";
import { Link } from "@mui/material";

const MyQuestionsAndAnswers = () => {
  const [value, setValue] = React.useState("tab1");
  const [currentPage, setCurrentPage] = useState({});
  const [questions, setQuestions] = useState();
  const [answers, setAnswers] = useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    load();
  };
  async function load() {
    if (value == "tab2") {
      var res = await axios.get(
        "http://localhost:5000/api/questions/getQuestionsByUserId",
        {
          params: { page: currentPage, limit: 5 },
        }
      );
      setQuestions(res.data.data);
    }
    if (value == "tab1") {
      var res = await axios.get(
        "http://localhost:5000/api/users/getAnswersByUserId",
        {
          params: { page: currentPage, limit: 5 },
        }
      );
      setAnswers(res.data.data);
    }
  }
  function onPageChange(event, new_page) {
    setCurrentPage(new_page);
  }
  useEffect(async () => {
    console.log(value);
    // İlk açıldığında value = 1
    if (value == "tab1") {
      var res = await axios.get(
        "http://localhost:5000/api/questions/getQuestionsByUserId",
        {
          params: { page: currentPage, limit: 5 },
        }
      );
      setQuestions(res.data.data);
    } else load();
  }, [currentPage]);
  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab value="tab1" label="Questions" />
        <Tab value="tab2" label="Answers" />
      </Tabs>{" "}
      {value == "tab1" ? (
        <Card>
          {questions &&
            questions.map((question) => (
              <div key={question._id}>{question.title}</div>
            ))}
        </Card>
      ) : (
        <Card>
          {answers &&
            answers.map((answer) => <div key={answer._id}>{answer.content}</div>)}
        </Card>
      )}
    </Box>
  );
};
export default MyQuestionsAndAnswers;
