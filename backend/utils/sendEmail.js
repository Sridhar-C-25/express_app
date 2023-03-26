const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL_ID,
        pass: process.env.USER_EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: "simplylearn.vercel.app",
      },
    });
    transporter
      .verify()
      .then((res) => console.log(res, "--res"))
      .catch((err) => console.log(err, "err"));
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
