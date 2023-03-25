const {
  login,
  register,
  createForgotPasswordToken,
} = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/login", login);
router.post("/signup", register);
router.post("/forgotpasswordtoken", createForgotPasswordToken);

module.exports = router;
