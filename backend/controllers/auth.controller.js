const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const apiStatus = require("../Enums/apiStatus");

const register = async (req, res, next) => {
  try {
    // Check if user exists
    console.log(req.body);
    const { email, password } = req.body;

    const hash = bcrypt.hashSync(password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.validate().then(
      () => null,
      (err) => {
        res.send({
          message: err.message.split(":")[2],
          status: apiStatus.failure,
        });
      }
    );

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.send({
        message: "User already exists",
        status: apiStatus.failure,
      });
    }

    await newUser.save();
    res.status(201).send({
      message: "User has been created.",
      status: apiStatus.success,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.send({
        message: "All fields are required",
        status: apiStatus.failure,
      });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.send({
        message: "User not found!",
        status: apiStatus.failure,
      });

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    if (!isCorrect)
      return res.send({
        message: "Wrong password or username!",
        status: apiStatus.failure,
      });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_KEY
    );
    const { password, ...info } = user._doc;
    res
      .cookie("token", token, {
        httpOnly: false,
      })
      .status(200)
      .send({
        message: "login successful!",
        status: apiStatus.success,
        data: info,
        token,
      });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  register,
};
