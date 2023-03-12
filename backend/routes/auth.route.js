const { login, register } = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/login", login);
router.post("/signup", register);

module.exports = router;
