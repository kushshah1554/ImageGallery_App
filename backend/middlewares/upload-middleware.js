const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "uploads/");
  },
  filename: (req, file, cd) => {
    cd(null, file.originalname);
  },
});

const checkFileFilter = (req, file, cd) => {
  if (file.mimetype.startsWith("image")) {
    cd(null, true);
  } else {
    cd(new Error("Not a image!!! please upload image."));
  }
};

module.exports = multer({
  storage: storage,
  fileFilter: checkFileFilter,
  limits: 5 * 1024 * 1024,
});
