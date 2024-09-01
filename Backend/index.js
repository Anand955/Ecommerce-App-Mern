const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db.js");
const router = require("./routes/index.js");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);
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
