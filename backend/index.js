const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8000;
app.get("/hello", (req, res) => {
  res.send("Hello Server is working", 200);
});
app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
