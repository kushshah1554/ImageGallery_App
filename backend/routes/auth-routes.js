const express = require("express");
const {
  loginController,
  signupController,
  checkTokenIsValidOrNot,
  rememberMeController,
} = require("../controllers/auth-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/remember_me",authMiddleware, rememberMeController);
router.get("/token_valid_check", checkTokenIsValidOrNot);

module.exports = router;
