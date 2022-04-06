const User = require("../models/User");
const { CustomError } = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const { sendJwtToClient } = require("../helpers/authorization/tokenHelpers");
const { sendEmail } = require("../helpers/libraries/sendEmail");
const {
  validateUserInput,
  comparePassword,
} = require("../helpers/input/inputHelpers");

const register = asyncErrorWrapper(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendJwtToClient(user, res);
});
const login = asyncErrorWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!validateUserInput(email, password)) {
    return next(new CustomError("Please check your input", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (user === null) {
    return next(new CustomError("Please check your input", 400));
  }

  if (!comparePassword(password, user.password)) {
    return next(new CustomError("Please check your credentials", 400));
  }

  sendJwtToClient(user, res);
});

const logout = asyncErrorWrapper(async (req, res, next) => {
  const { NODE_ENV } = process.env;
  return res
    .status(200)
    .cookie("access_token",{
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message: "logout successfull",
    });
});
const getUser = async (req, res, next) => {
  const id = req.user.id;
  console.log(id);
  const user = await User.findById(id);
  console.log(user);
  res.json({
    succes: true,
    data: user.toObject()
  });
};

const imageUpload = asyncErrorWrapper(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      profile_image: req.savedProfileImage,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  // Image Upload Success
  res.status(200).json({
    success: true,
    message: "image upload successfull",
  });
});

const forgotPassword = asyncErrorWrapper(async (req, res, next) => {
  const resetEmail = req.body.email;
  const user = await User.findOne({ email: resetEmail });
  if (!user) {
    return next(new CustomError("There is no user with that email", 400));
  }
  user.getResetPasswordTokenFromUser();
  const resetPasswordToken = user.resetPasswordToken;
  await user.save();

  const resetPasswordURL = `http://localhost:5000/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;
  const emailTemplate = `
  <h3>Reset Your Password</h3>
  <p> This <a href='${resetPasswordURL}' target='_blank'>link</a> will expire in one hour.</p>
  `;
  try {
    await sendEmail({
      from: process.env.SMTP_USER,
      to: resetEmail,
      subject: "Reset your Password",
      html: emailTemplate,
    });
    return res.status(200).json({
      success: true,
      message: "Token Sent to your email",
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    console.log(err);
    return next(new CustomError("Email could not be send", 500));
  }
});

const resetPassword = asyncErrorWrapper(async (req, res, next) => {
  const { resetPasswordToken } = req.query; // get token from url
  const { password } = req.body; // new Password
  if (!resetPasswordToken) {
    return next(new CustomError("Please provide a valid token", 400));
  }
  let user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }, // if resetPasswordExpire greater than date.now * mongodb özelliği
  });
  if (!user) {
    return next(new CustomError("Invalid token or session expired", 400));
  }
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Reset Password Process Successfull",
  });
});

const editDetails = asyncErrorWrapper(async (req, res, next) => {
  const editInformation = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, editInformation, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    success: true,
    data: user,
  });
});
module.exports = {
  register,
  getUser,
  login,
  logout,
  imageUpload,
  forgotPassword,
  resetPassword,
  editDetails,
};
