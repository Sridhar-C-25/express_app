// const express = require("express");
// const app = express();
// const path = require("path");
// const dotenv = require("dotenv").config();
//
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "./frontend/dist")));
//   app.get("*", (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, "./", "frontend", "dist", "index.html")
//     )
//   );
// }
//
// app.listen(process.env.PORT || 3000, () => {
//   console.log(`Example app listening on port ${process.env.PORT || 3000}!`);
// });

const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./backend/config/db");
// Routes
const authRoute = require("./backend/routes/auth.route");
const gigRoute = require("./backend/routes/gig.route");
const userRoute = require("./backend/routes/user.route");
const apiStatus = require("./backend/Enums/apiStatus");

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: ["http://localhost:5173/login", "http://192.168.117.153:5173"],
      credentials: true,
    })
  );
  // middleware
}

// routes
app.use("/api/auth", authRoute);
app.use("/api/gig", gigRoute);
app.use("/api/user", userRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).send({ message: errorMessage });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "./", "frontend", "dist", "index.html")
    )
  );
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server started", port);
});
