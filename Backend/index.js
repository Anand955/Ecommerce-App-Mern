const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db.jsx");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("connected to DB ");
    console.log(`Server runinig on port ${PORT}`);
  });
  app.get("/", (req, res) => {
    res.send("<h1>hello jgfi</h1>");
  });
});
