const bcrypt = require("bcryptjs");
const userModel = require("../model/userModel");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ message: "Please provide email", error: true });
    }
    if (!password) {
      return res
        .status(400)
        .json({ message: "Please provide password", error: true });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User Not Found");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    console.log(checkPassword);

    if (checkPassword) {
    } else {
      throw new Error("Please Check Password");
    }
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;
