const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions
} = require("../middleware/authmiddleware");

const {
  getAllOrders,
  getOneOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder
} = require("../controllers/orderController");

router
  .route("/")
  .post(authenticateUser, createOrder)
  .get(authenticateUser, authorizePermissions("admin"), getAllOrders);

router.route("/myorders").get(authenticateUser, getCurrentUserOrders);

router.route("/:id").get(authenticateUser, getOneOrder);

router.route("/update/:id").patch(authenticateUser, updateOrder);

module.exports = router;
