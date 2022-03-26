const express = require("express");
const router = express.Router();
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const {
  profileImageUpload,
} = require("../middlewares/libraries/profileImageUpload");
const {
  register,
  getUser,
  login,
  logout,
  imageUpload,
  forgotPassword,
  resetPassword,
  editDetails
} = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", getAccessToRoute, logout);
router.get("/getuser",(req,res,next)=>{
  res.status(200).json(req.user)
});
router.get("/profile", getAccessToRoute, getUser);
router.post(
  "/upload",
  [getAccessToRoute, profileImageUpload.single("profile_image")],
  imageUpload
);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword", resetPassword);
router.put("/edit", getAccessToRoute, editDetails);

module.exports = router;
