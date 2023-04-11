const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const apiStatus = require("../Enums/apiStatus");
const passwordToken = require("../models/passwordToken.model");
const crypto = require("crypto-js");
const sendEmail = require("../utils/sendEmail");
const sendVerificationEmail = require("../utils/email/verificationEmail");

const register = async (req, res, next) => {
  try {
    // Check if user exists
    console.log(req.body);
    const { email, password } = req.body;

    const hash = bcrypt.hashSync(password, 5);
    const vcode = crypto.lib.WordArray.random(6);

    const newUser = new User({
      ...req.body,
      password: hash,
      vcode,
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
      const link = `${process.env.WEB_BASE_URL}/verification/${userExists._id}/${userExists.vcode}`;
      if (userExists.status === "Pending") {
        await sendVerificationEmail(email, link)
          .then((eres) => {
            console.log(eres, "--res");
            // return res.send({
            //   message: "Verfication is pending!",
            //   status: apiStatus.success,
            // });
          })
          .catch((err) => {
            res.send(err);
          });
      }
      return res.send({
        message: "User already exists",
        status: apiStatus.failure,
      });
    }
    const user = await newUser.save();

    const link = `${process.env.WEB_BASE_URL}/verification/${user._id}/${user.vcode}`;

    await sendVerificationEmail(req.body.email, link)
      .then((eres) => {
        console.log(eres);
        return res.status(201).send({
          message: "User has been created, but verfication is pending!",
          status: apiStatus.success,
        });
      })
      .catch((err) => {
        res.send(err, "err");
      });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const verifyAccount = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userId);

    if (!user)
      return res.send({
        status: apiStatus.failure,
        message: "user not found!",
      });

    const match = user.vcode == req.body.vcode;

    if (!match) {
      res.send({
        status: apiStatus.failure,
        message: "Verfication failed",
      });
    }

    user.status = "Active";
    await user.save();

    res.send({
      status: apiStatus.success,
      message: "Verfication Successfully!",
    });
  } catch (error) {
    next(error);
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

    if (user.status != "Active") {
      return res.send({
        status: apiStatus.failure,
        message: "Pending Account. Please Verify Your Email!",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_KEY
    );
    const { password, ...info } = user._doc;
    res.cookie("token", token).status(200).send({
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
    const link = `${process.env.WEB_BASE_URL}/forgotpassword/${user._id}/${token.token}`;
    console.log(link);
    await sendEmail(req.body.email, "forgot password token", link)
      .then((eres) => {
        res.send({
          status: apiStatus.success,
          message: "Email send successfully!",
        });
      })
      .catch((err) => {
        res.send(err);
      });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user)
      return res.send({
        status: apiStatus.failure,
        message: "user not found!",
      });

    const token = await passwordToken.findOne({
      userId: user._id,
      token: req.body.token,
    });
    if (!token)
      return res.send({
        status: apiStatus.failure,
        message: "Invalid link or expired",
      });
    const hash = bcrypt.hashSync(req.body.newpassword, 5);
    user.password = hash;
    await user.save();
    await passwordToken.deleteOne({ _id: token._id });

    res.send({
      status: apiStatus.success,
      message: "Password reset sucessfully.",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  login,
  register,
  createForgotPasswordToken,
  forgotPassword,
  verifyAccount,
};
