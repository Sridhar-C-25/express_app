const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World! change");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${process.env.PORT || 3000}!`);
});
