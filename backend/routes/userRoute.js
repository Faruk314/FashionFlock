const router = require("express").Router();
const {
  register,
  login,
  logout,
  loginStatus,
  getUserInfo,
} = require("../controllers/userController");
const upload = require("../utils/fileUpload");
const protect = require("../utils/protect");

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/loginstatus", loginStatus);

router.get("/getuserinfo", protect, getUserInfo);

module.exports = router;
