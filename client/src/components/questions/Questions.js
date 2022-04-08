import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";
import axios from "axios";
import PaginationComponent from "../PaginationComponent";
import Loading from "../Loading";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState({});
  const [loading, setLoading] = useState(true);

  function onPageChange(event, new_page) {
    setCurrentPage(new_page);
  }
  useEffect(async () => {
    setLoading(true);
    var res = await axios.get("http://localhost:5000/api/questions", {
      params: { page: currentPage, limit: 5 },
    });

    setQuestions(res.data.data);
    setPagination(res.data.pagination);

    setLoading(false);
  }, [currentPage]);

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      {" "}
      <Button
        to="/newquestion"
        component={Link}
        variant="contained"
        size="small"
        sx={{ marginBottom: "10px" }}
      >
        Ask New Question
      </Button>
      {questions.map((question) => (
        <QuestionItem key={question._id} question={question}></QuestionItem>
      ))}
      <PaginationComponent
        pagination={pagination}
        onPageChange={onPageChange}
      ></PaginationComponent>
    </div>
  );
};

export default Questions;
