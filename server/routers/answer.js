const express = require("express");
const router = express.Router({mergeParams:true});
const {
    addNewAnswerToQuestion,
    getAllAnswersByQuestions,
    getSingleAnswer,
    editAnswer,
    deleteAnswer,
    undoLikeAnswer,
    likeAnswer
  } = require("../controllers/answer");
const {
    getAccessToRoute,
    getAnswerOwnerAccess,
    getUser
  } = require("../middlewares/authorization/auth");
  const {
    checkQuestionAndAnswerExist
  } = require("../middlewares/database/databesErrorHelpers");

router.post("/", getAccessToRoute, addNewAnswerToQuestion);
router.get("/", getAllAnswersByQuestions);
router.get("/:answer_id", checkQuestionAndAnswerExist, getSingleAnswer);
router.put("/:answer_id/edit", [checkQuestionAndAnswerExist, getAccessToRoute,getAnswerOwnerAccess ], editAnswer);
router.delete("/:answer_id/delete", [checkQuestionAndAnswerExist, getAccessToRoute,getAnswerOwnerAccess ], deleteAnswer);
router.post("/:answer_id/like", [checkQuestionAndAnswerExist, getAccessToRoute ], likeAnswer);
router.post("/:answer_id/undo_like", [checkQuestionAndAnswerExist, getAccessToRoute ], undoLikeAnswer);

module.exports=router;