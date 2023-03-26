const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: process.env.NODE_ENV === "production",
      auth: {
        user: process.env.USER_EMAIL_ID,
        pass: process.env.USER_EMAIL_PASS,
      },
    });

    await transporter
      .sendMail({
        from: "codeaprogram@gmail.com",
        to: email,
        subject: subject,
        text: text,
      })
      .then((res) => res)
      .catch((err) => {
        return err;
      });
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = sendEmail;
