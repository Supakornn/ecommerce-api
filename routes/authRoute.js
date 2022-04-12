const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authmiddleware");
const {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", authenticateUser, logout);
router.post("/verify", verifyEmail);
router.post("/resetpassword", resetPassword);
router.post("/forgotpassword", forgotPassword);

module.exports = router;
