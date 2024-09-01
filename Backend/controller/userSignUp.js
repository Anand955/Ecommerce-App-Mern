const userModel = require("../model/userModel.js");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      throw new Error("User has Already Registred.");
    }
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
    if (!name) {
      return res
        .status(400)
        .json({ message: "Please provide name", error: true });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt); // No need for 'await' since it's synchronous

    if (!hashPassword) {
      throw new Error("Something went wrong while hashing the password");
    }

    const payload = {
      ...req.body,
      password: hashPassword,
    };

    const userData = new userModel(payload);
    const saveUser = await userData.save(); // Await the save operation
    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created successfully!",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
