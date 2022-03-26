const multer = require("multer");
const path = require("path");
const {CustomError} = require("../../helpers/error/CustomError");

// Storage, FileFilter

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const rootDir = path.dirname(require.main.filename);
    callback(null, path.join(rootDir, "/public/uploads"));
  },
  filename: function (req, file, callback) {
    // File - MimeType - image/png

    const extension = file.mimetype.split("/")[1];
    req.savedProfileImage = "image_" + req.user.id + "." + extension;
    callback(null, req.savedProfileImage);
  },
});

const fileFilter = (req, file, cb) => {
  let allowedMimeTypes = ["image/jpg", "image/gif", "image/jpeg", "image/png"];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new CustomError("Please provide a valid image file", 400),
      false
    );
  }
  return cb(null, true);
};

const profileImageUpload = multer({ storage, fileFilter });

module.exports = {profileImageUpload};
