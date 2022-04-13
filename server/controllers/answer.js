const Question = require("../models/Question");
const Answer = require("../models/Answer");
const { CustomError } = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const {

  paginationHelper,
} = require("../middlewares/query/queryMiddlewareHelpers");

const addNewAnswerToQuestion = asyncErrorWrapper(async (req, res, next) => {
  const question_id = req.data._id;
  const user_id = req.user.id;
  console.log(user_id);
  const information = req.body;
  const answer = await Answer.create({
    ...information,
    question: question_id,
    user: user_id,
  });
  return res.status(200).json({
    data: answer,
    success: true,
  });
});

const getAllAnswersByQuestions = asyncErrorWrapper(async (req, res, next) => {
 
  return res.status(200).json(res.queryResults);
 
});

const getSingleAnswer = asyncErrorWrapper(async (req, res, next) => {
  const { answer_id } = req.params;
  const answer = await Answer.findById(answer_id)
    .populate({
      path: "question",
      select: "title",
    })
    .populate({ path: "user", select: "name profile_image" });

  return res.status(200).json({
    success: true,

    data: answer,
  });
});


const editAnswer = asyncErrorWrapper(async (req, res, next) => {
  const { answer_id } = req.params;
  const { content } = req.body;
  const answer = await Answer.findById(answer_id);
  answer.content = content;
  await answer.save();
  return res.status(200).json({
    success: true,
    data: answer,
  });
});

const deleteAnswer = asyncErrorWrapper(async (req, res, next) => {
  const { answer_id } = req.params;
  const { question_id } = req.params;
  await Answer.findByIdAndRemove(answer_id);
  const question = await Question.findById(question_id);
  question.answers.splice(question.answers.indexOf(answer_id), 1);
  question.answerCount=question.answers.length;
  await question.save();

  return res.status(200).json({
    success: true,
    message: "Answer deleted succesfully",
  });
});

const likeAnswer = asyncErrorWrapper(async (req, res, next) => {
  const { answer_id } = req.params;
  const answer = await Answer.findById(answer_id);
  if (answer.likes.includes(req.user.id)) {
    return next(new CustomError("You already liked this answer", 400));
  }

  answer.likes.push(req.user.id);
  answer.likeCount = answer.likes.length;
  await answer.save();

  res.status(200).json({
    success: true,
    data: answer,
  });
});
const getAnswersByUserId=asyncErrorWrapper(async(req,res,next)=>{
  const userId = req.user.id;
  console.log(userId);
  const mongoose = require("mongoose");
  var buildQuery = function () {
    return Answer.find({
      user: mongoose.Types.ObjectId(userId),
    }).populate({
      path: "question",
      select: "title id",
    });
  };

  var query = buildQuery();
  var query1 = buildQuery();
  
  const total = await query1.countDocuments();
  const paginationResult = await paginationHelper(total, query, req);
  query = paginationResult.query;

  const pagination = paginationResult.pagination;

  const answers = await query;
  res.json({
    data: answers,
    pagination,
  });
})

const undoLikeAnswer = asyncErrorWrapper(async (req, res, next) => {
  const { answer_id } = req.params;
  const answer = await Answer.findById(answer_id);
  if (!answer.likes.includes(req.user.id)) {
    return next(
      new CustomError("You can not undo like operation for this answer", 400)
    );
  }
  const index = answer.likes.indexOf(req.user.id);
  answer.likes.splice(index, 1);
  answer.likeCount = answer.likes.length;
  await answer.save();

  res.status(200).json({
    success: true,
    data: answer,
  });
});
module.exports = {
  addNewAnswerToQuestion,
  getAllAnswersByQuestions,
  getSingleAnswer,
  editAnswer,
  deleteAnswer,
  likeAnswer,
  undoLikeAnswer,
  getAnswersByUserId
};
