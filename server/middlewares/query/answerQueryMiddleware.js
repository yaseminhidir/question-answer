const User = require("../../models/User");
const asyncErrorWrapper = require("express-async-handler");
const {
  paginationHelper,
  populateHelper,
} = require("./queryMiddlewareHelpers");
const { CustomError } = require("../../helpers/error/CustomError");

const answerQueryMiddleware = function (model, options) {
  return asyncErrorWrapper(async function (req, res, next) {
    const { id } = req.params;
    const arrayName = "answers";
    const total = (await model.findById(id))["answerCount"]; //Bir sorudaki cevap sayısı
    const paginationResult = await paginationHelper(total, undefined, req);
    const startIndex = paginationResult.startIndex;
    const limit = paginationResult.limit;
    let queryObject = {};
    queryObject[arrayName] = { $slice: [startIndex, limit] };
    let query = model.find({ _id: id }, queryObject);
    query = populateHelper(query, options.population);
    const queryResults = await query;
    for (const question of queryResults) {
      if (req.user) {
        question.likedByCurrentUser = question.likes.includes(req.user.id);
      } else {
        question.likedByCurrentUser = false;
      }
      if (question.answers) {
        for (const answer of question.answers) {
          if (answer.likes) {
            if (req.user) {
              answer.likedByCurrentUser = answer.likes.includes(req.user.id);
              console.log(req.user.id)
              console.log(answer.likedByCurrentUser)
            } else {
              answer.likedByCurrentUser = false;
            }
          }
        }
      }
    }
    res.queryResults = {
      success: true,
      pagination: paginationResult.pagination,
      data: queryResults,
    };
    next();
  });
};

module.exports = { answerQueryMiddleware };
