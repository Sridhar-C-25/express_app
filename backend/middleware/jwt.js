const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).send({
      message: "You are not authenticated!",
      status: 0,
    });
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) {
      return res.status(403).send({
        message: "Token is not valid!",
        status: 0,
      });
    }
    req.userId = payload.id;
    next();
  });
};

module.exports = verifyToken;
