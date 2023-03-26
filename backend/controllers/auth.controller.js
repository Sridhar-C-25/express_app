const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const apiStatus = require("../Enums/apiStatus");
const passwordToken = require("../models/passwordToken.model");
const crypto = require("crypto-js");
const sendEmail = require("../utils/sendEmail");

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

const createForgotPasswordToken = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(req.body);
    if (!user)
      return res.send({
        message: "User not found!",
        status: apiStatus.failure,
      });

    let token = await passwordToken.findOne({ userId: user._id });
    if (!token) {
      token = await new passwordToken({
        userId: user._id,
        token: crypto.lib.WordArray.random(20),
      }).save();
    }
    const link = `liveapp/forgotpassword/${user._id}/${token.token}`;
    await sendEmail(req.body.email, "forgot password token", link)
      .then((eres) => {
        res.send({
          status: apiStatus.success,
          message: "Email send successfully!",
          data: {
            link,
            token,
            user,
            eres,
          },
        });
      })
      .catch((err) => {
        res.send(err);
      });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  login,
  register,
  createForgotPasswordToken,
};
