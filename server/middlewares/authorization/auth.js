var { CustomError } = require("../../helpers/error/CustomError");
const User = require("../../models/User");
const Question = require("../../models/Question");
var {
  isTokenIncluded,
  getAccessTokenFromHeader,
} = require("../../helpers/authorization/tokenHelpers");
const asyncErrorWrapper = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Answer = require("../../models/Answer");

const checkAuth = (req, res, next) => {
  const { JWT_SECRET_KEY } = process.env;

  if (isTokenIncluded(req)) {
    const access_token = getAccessTokenFromHeader(req);
    jwt.verify(access_token, JWT_SECRET_KEY, (err, decoded) => {
      if (!err) {
        req.user = {
          id: decoded.id,
          name: decoded.name,
        };
        console.log(decoded);
      }
      return next();
    });
  } else {
    return next();
  }
};

const getAccessToRoute = (req, res, next) => {
  if (!req.user) {
    return next(
      new CustomError("You are not authorized to access this route", 401)
    );
  }
  next();
};
const getAdminAccess = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id);
  if (user.role !== "admin") {
    return next(new CustomError("Only admins can access this route", 403));
  }
  next();
});

const getQuestionOwnerAccess = asyncErrorWrapper(async (req, res, next) => {
  const userId = req.user.id;
  const questionId = req.params.id;

  const question = await Question.findById(questionId);

  if (question.user != userId) {
    return next(new CustomError("Only owner can handle this operation", 403));
  }

  next();
});
const getAnswerOwnerAccess = asyncErrorWrapper(async (req, res, next) => {
  const userId = req.user.id;
  const answerId = req.params.answer_id;

  const answer = await Answer.findById(answerId);

  if (answer.user != userId) {
    return next(new CustomError("Only owner can handle this operation", 403));
  }

  next();
});
module.exports = {
  getAccessToRoute,
  getAdminAccess,
  getQuestionOwnerAccess,
  getAnswerOwnerAccess,
  checkAuth,
};
