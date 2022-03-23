const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authmiddleware");

const {
  getAllUsers,
  getOneUser,
  showCurrentUser,
  updateUser,
  updateUserPassword
} = require("../controllers/userController");

router.route("/").get(authenticateUser, getAllUsers);
router.route("/me").get(showCurrentUser);
router.route("/updateuser").post(updateUser);
router.route("/updatepassword").post(updateUserPassword);
router.route("/:id").get(authenticateUser, getOneUser);

module.exports = router;
