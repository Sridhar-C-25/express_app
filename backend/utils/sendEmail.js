const nodemailer = require("nodemailer");
const Transport = require("nodemailer-sendinblue-transport");

const sendEmail = async (email, subject, text) => {
  try {
    console.log(process.env.SENDINBLUE_API_KEY);
    const transporter = nodemailer.createTransport(
      new Transport({
        apiKey: process.env.SENDINBLUE_API_KEY,
      })
    );

    const res = await transporter.sendMail({
      from: "iamsmartsri@gmail.com",
      to: email,
      subject: subject,
      text: text,
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error, "email not sent");
    return error;
  }
};

module.exports = sendEmail;
