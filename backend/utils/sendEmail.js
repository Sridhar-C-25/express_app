const nodemailer = require("nodemailer");
const Transport = require("nodemailer-sendinblue-transport");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport(
      new Transport({
        apiKey:
          "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",
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
