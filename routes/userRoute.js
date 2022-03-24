const express = require("express");
const router = express.Router();
const { authenticateUser, authorizePermissions } = require("../middleware/authmiddleware");

const {
  getAllUsers,
  getOneUser,
  showCurrentUser,
  updateUser,
  updateUserPassword
} = require("../controllers/userController");

router.route("/").get(authenticateUser, authorizePermissions("admin"), getAllUsers);
router.route("/me").get(authenticateUser, showCurrentUser);
router.route("/updateuser").post(authenticateUser, updateUser);
router.route("/updatepassword").post(authenticateUser, updateUserPassword);
router.route("/:id").get(authenticateUser, getOneUser);

module.exports = router;
