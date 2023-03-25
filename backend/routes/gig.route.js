const verifyToken = require("../middleware/jwt");

const router = require("express").Router();

router.post("/", verifyToken, (req, res) => {
  return res.send(req.userId);
});

module.exports = router;
