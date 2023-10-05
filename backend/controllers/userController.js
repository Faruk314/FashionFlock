const User = require("../models/UserModel");
const AsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const register = AsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fileds must be filled");
  }

  const user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error("User with this email already exists");
  }

  const newUser = await User.create({
    username,
    email,
    password,
  });

  const token = generateToken(newUser._id);

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite: "none",
    secure: true,
  });

  if (newUser) {
    const { _id, username, email, profilePic } = newUser;
    res.status(200).json({
      _id,
      username,
      email,
      profilePic,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fileds must be filled");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("Email or password is not valid");
  }

  const passwordCorrect = await bcrypt.compare(password, user.password);

  if (user && passwordCorrect) {
    const token = generateToken(user._id);

    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      sameSite: "none",
      secure: true,
    });
    const { username, email, profilePic } = user;
    res.status(200).json({
      username,
      email,
      profilePic,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Incorrect password or email");
  }
});

const logout = AsyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });

  return res.status(200).json({ message: "succesfully loged out" });
});

const loginStatus = AsyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json(false);
  }

  const verified = jwt.verify(token, process.env.JWT_SECRET);

  if (verified) {
    return res.json(true);
  }

  return res.json(false);
});

const getUserInfo = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User is not found");
  }

  res.status(200).json(user);
});

module.exports = {
  register,
  login,
  logout,
  loginStatus,
  getUserInfo,
};
