const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/User");
const {
  CustomAPIError,
  BadRequestError,
  NotFoundError,
} = require("../errors/custom-error");

// This function creates a new user
// It takes in the username and password from the request body
// It checks if the username and password are valid
// If the username and password are valid, it hashes the password
// It then creates a new user with the hashed password
// It then responds with the status and the user

const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new BadRequestError("Invalid username/password", 400);
    }
    //hash password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({ status: "success", user });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new BadRequestError();
    }

    const user = await User.findOne({ username });

    if (!user) {
      throw new NotFoundError();
    }

    // check if user exists && password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new CustomAPIError("password incorrect", 400);
    }

    //create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    //send token to client
    res.status(200).json({ status: "success", token });
  } catch (error) {
    throw new CustomAPIError(error.message, 500);
  }
};

const dashboard = async (req, res) => {
  try {
    const luckyNumber = Math.floor(Math.random() * 100);
    if (!req.user || !req.user.userId) {
      throw new CustomAPIError("Invalid user object", 400);
    }
    const user = await User.findById(req.user.userId);
    if (!user) {
      throw new NotFoundError();
    }
    res.status(200).json({
      msg: `Hello, ${user.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    throw new CustomAPIError(error.message, 500);
  }
};

module.exports = { signUp, login, dashboard };
