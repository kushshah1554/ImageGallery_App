const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");

const signupController = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    //check user already exist or not
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({
        success: false,
        message: "email already exist try another email",
      });
    }

    //hash password
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    // save to database

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await newUser.save();

    if (newUser) {
      res
        .status(200)
        .json({ success: true, message: "signup successfully", newUser });
    } else {
      res
        .status(400)
        .json({ success: false, message: "New user can not be added " });
    }
  } catch (error) {
    console.log("Error", error);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong!!!!!" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check user exist or not
    const currentUser = await User.findOne({ email });
    if (!currentUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    //check password is correct or not
    const isPasswordCorrect = await bycrypt.compare(
      password,
      currentUser.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Password is incorrect" });
    }
    const accessToken = jwt.sign(
      {
        username: currentUser.username,
        userId: currentUser._id,
        role: currentUser.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30m" }
    );

    res
      .status(200)
      .json({ success: true, message: "Login successfully", accessToken });
  } catch (error) {
    console.log("Error", error);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong!!!!!" });
  }
};

const checkTokenIsValidOrNot = async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "token is not passed" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decodedToken) {
      res.status(200).json({
        success: true,
        message: "token is valid and active",
        userInfo: {
          userId: decodedToken.userId,
          username: decodedToken.username,
        },
      });
    } else {
      res.status(401).json({ success: false, message: "token is not valid" });
    }
  } catch (e) {
    console.log("Error:", e);
    res.status(401).json({ success: false, message: "Token is not valid!!!!" });
  }
};

const rememberMeController = async (req, res) => {
  try {
    const currentUser = await User.findById(req.userInfo.userId);

    //check user exist or not
    if (!currentUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Email retrive successfully",
      email: currentUser.email,
    });
  } catch (error) {
    console.log("Error:", e);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong!!!!" });
  }
};

module.exports = {
  loginController,
  signupController,
  checkTokenIsValidOrNot,
  rememberMeController,
};
