const {
  login,
  register,
  createForgotPasswordToken,
  forgotPassword,
  verifyAccount,
} = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/login", login);
router.post("/signup", register);
router.post("/forgotpasswordtoken", createForgotPasswordToken);
router.post("/forgotpassword", forgotPassword);
router.post("/verifyaccount", verifyAccount);

module.exports = router;
