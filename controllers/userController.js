const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res, next) => {
  console.log(req.body);
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.status(400).json({ error: "Please provide all fields" });
  }

  let user = await User.findOne({ email }); 
  if (user) {
    return res.status(400).json({ error: "Email Already In Use." });
  }

  // const hashedPassword = await bcrypt.hash(password, 12);

  // user = await User.create({ email, username, password: hashedPassword });
  res.status(201).json({ message: "hello" });
};

const login = async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Please provide all fields");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid Credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);
  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }

  const token = jwt.sign({ id: user._id }, "123456789", { expiresIn: "1h" });
  res.status(200).json({ token });
};

const verifyToken = async (req, res, next) => {
  let token = req.headers["authorization"] || "";
  token = token.replace("Bearer ", "");

  if (!token) return next();
  try {
    const decodedToken = await jwt.verify(token, "123456789");
    req.user = decodedToken;
    next();
  } catch (error) {
    return next();
  }
};

module.exports = {
  register,
  login,
  verifyToken,
};
