const express = require("express");
const router = express.Router();
const {checkUserExist}=require("../middlewares/database/databesErrorHelpers")
const {getSingleUser, getAllUsers}=require("../controllers/user.js")
const {
    userQueryMiddleware,
  } = require("../middlewares/query/userQueryMiddleware");
const User = require("../models/User");
const {

  getAnswersByUserId
} = require("../controllers/answer"); 
router.get("/getAnswersByUserId", getAnswersByUserId);
router.get("/",userQueryMiddleware(User), getAllUsers);
router.get("/:id", checkUserExist, getSingleUser);


module.exports=router;