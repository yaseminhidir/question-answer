const { CustomError } = require("../../helpers/error/CustomError");

const customErrorHandler = (err, req, res, next) => {
  let customError = err;
 
  if (err.code === 11000) {
    customError = new CustomError("Dublicate Key Found: Check Your Input", 400);
  }
  if (err.name === "SyntaxError") {
    customError = new CustomError("Unexpected Syntax", 400);
  }
  if(err.name ==="CastError"){
    customError = new CustomError("Please provide a valid id", 400);
  }
  if (err.name === "ValidationError") {
    customError = new CustomError(err.message, 400);
  }
 // console.log(customError.message, customError.status);
  res.status(customError.status || 500).json({
    succes: false,
    message: customError.message,
  });
};




module.exports = customErrorHandler;

