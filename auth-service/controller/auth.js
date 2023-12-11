const db = require("../config/db");
const { ErrorResponse, generateToken, showError } = require("../utils/index");
const bcrypt = require("bcryptjs");
const { User } = require("../model/User");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const checkValues = !name || !email || !password;

  if (checkValues) {
    res.status(400).json({ message: "invalid req" });
    new ErrorResponse("invalid req", 400);
  }

  try {
    let matchingEmail = await User.findOne({ where: { email } });

    if (matchingEmail) {
      throw new ErrorResponse("Email exists please login", 409);
    }
    let salt = await bcrypt.genSalt(12);
    let hashedpass = await bcrypt.hash(password, salt);

    let newUser = User.create({
      name: name,
      email,
      password: hashedpass,
    });

    if (newUser) {
      let token = generateToken(newUser.id);
      res.status(201).cookie("token", token).json({
        token,
        success: "Registration successful",
      });
    } else {
      throw new ErrorResponse("failed to create User", 400);
    }
  } catch (error) {
    console.log(`error : ${error}`);
    const message = error.message || "Internal Server error";
    const cs = error.statusCode || 500;
    res.status(cs).json(showError(message, cs));
  }
};

const login = async () => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ErrorResponse("invalid Req", 400);
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new ErrorResponse("Invalid credentails", 422);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ErrorResponse("Invalid credentials", 422);
    }

    let token = generateToken(user.id);
    res.status(200).json({ token, success: "welcome Back" });
  } catch (error) {
    console.log(`error : ${error}`);
    const message = error.message || "Internal Server error";
    const cs = error.statusCode || 500;
    res.status(cs).json(showError(message, cs));
  }
};

module.exports = { signUp, login };
