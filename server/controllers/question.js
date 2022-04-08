const Question = require("../models/Question");
const { CustomError } = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const {
  searchHelper,
  populateHelper,
  questionSortHelper,
  paginationHelper,
} = require("../middlewares/query/queryMiddlewareHelpers");

const askNewQuestion = asyncErrorWrapper(async (req, res, next) => {
  const information = req.body;

  const question = await Question.create({
    title: information.title,
    content: information.content,
    user: req.user.id,
  });
  res.status(200).json({
    success: true,
    data: question,
  });
});

const getAllQuestions = asyncErrorWrapper(async (req, res, next) => {
  return res.status(200).json(res.queryResults);
});

const getSingleQuestion = asyncErrorWrapper(async (req, res, next) => {
  return res.status(200).json(res.queryResults);
});

const editQuestion = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;

  let question = await Question.findById(id);
  question.title = title;
  question.content = content;
  question = await Question.Save();
  res.status(200).json({
    success: true,
    data: question,
  });
});
const deleteQuestion = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;
  await Question.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Question delete operation success",
  });
});

const getQuestionsByUserId = asyncErrorWrapper(async (req, res, next) => {
  const user_id = req.user.id;
  const mongoose = require("mongoose");
  var query = Question.find({
    user: mongoose.Types.ObjectId(user_id),
  }).populate({
    path: "user",
    select: "name profile_image",
  });

  query = searchHelper("title", query, req);

  const total = await query.countDocuments();

  console.log("total", total);
  console.log("query", query);
  const paginationResult = paginationHelper(total, query, req);
  query = paginationResult.question;
  const pagination = paginationResult.query;
  console.log(pagination);

  query = questionSortHelper(query, req);
  
  var questions = await query;
  res.json({
    questions,
  });
});

const likeQuestion = asyncErrorWrapper(async (req, res, next) => {
  const question = req.data;

  if (question.likes.includes(req.user.id)) {
    return next(new CustomError("You already liked this queestion", 400));
  }

  question.likes.push(req.user.id);
  question.likeCount = question.likes.length;
  await question.save();

  res.status(200).json({
    success: true,
    data: question,
  });
});

const undoLikeQuestion = asyncErrorWrapper(async (req, res, next) => {
  const question = req.data;

  if (!question.likes.includes(req.user.id)) {
    return next(
      new CustomError("You can not undo like operation for this question", 400)
    );
  }

  const index = question.likes.indexOf(req.user.id);
  question.likes.splice(index, 1);
  question.likeCount = question.likes.length;

  await question.save();

  res.status(200).json({
    success: true,
    data: question,
  });
});

module.exports = {
  askNewQuestion,
  getAllQuestions,
  getSingleQuestion,
  editQuestion,
  deleteQuestion,
  likeQuestion,
  undoLikeQuestion,
  getQuestionsByUserId,
};
