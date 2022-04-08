const express = require("express");
const router = express.Router();
const answer = require("./answer");
const Question = require("../models/Question");
const {
  askNewQuestion,
  getAllQuestions,
  getSingleQuestion,
  editQuestion,
  deleteQuestion,
  likeQuestion,
  undoLikeQuestion,
  getQuestionsByUserId,
} = require("../controllers/question");
const {
  getAccessToRoute,
  getQuestionOwnerAccess,
} = require("../middlewares/authorization/auth");
const {
  checkQuestionExist,
} = require("../middlewares/database/databesErrorHelpers");
const {
  questionQueryMiddleware,
} = require("../middlewares/query/questionQueryMiddleware");
const {
  answerQueryMiddleware,
} = require("../middlewares/query/answerQueryMiddleware");

router.post("/ask", getAccessToRoute, askNewQuestion);
router.get(
  "/",
  questionQueryMiddleware(Question, {
    population: {
      path: "user",
      select: "name profile_image",
    },
  }),
  getAllQuestions
);
router.get(
  "/getQuestionsByUserId",
 
  getQuestionsByUserId
);
router.post("/:id/like", [getAccessToRoute, checkQuestionExist], likeQuestion);
router.post(
  "/:id/undo_like",
  [getAccessToRoute, checkQuestionExist],
  undoLikeQuestion
);
router.get(
  "/:id",
  checkQuestionExist,
  answerQueryMiddleware(Question, {
    population: [
      { path: "user", select: "name email profile_image" },
      {
        path: "answers",
        select: "content likes likeCount",
        populate: {
          path: "user",
          select: "name email profile_image",
        },
      },
    ],
  }),
  getSingleQuestion
);
router.put(
  "/:id/edit",
  [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess],
  editQuestion
);
router.delete(
  "/:id/delete",
  [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess],
  deleteQuestion
);
router.use("/:question_id/answers", checkQuestionExist, answer);

module.exports = router;
