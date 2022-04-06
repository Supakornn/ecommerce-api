const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authmiddleware");

const {
  createReview,
  getAllReview,
  getOneReview,
  updateReview,
  deleteReview
} = require("../controllers/reviewController");

router.route("/").get(authenticateUser, getAllReview);
router.route("/create").post(authenticateUser, createReview);
router.route("/:id").get(authenticateUser, getOneReview);
router.route("/update/:id").patch(authenticateUser, updateReview);
router.route("/delete/:id").delete(authenticateUser, deleteReview);

module.exports = router;
