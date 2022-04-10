const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions
} = require("../middleware/authmiddleware");
const {
  createProduct,
  getAllProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
  uploadImage
} = require("../controllers/productController");

const { getOneProductReviews } = require("../controllers/reviewController");

router.route("/").get([authenticateUser, authorizePermissions("admin")], getAllProduct);
router
  .route("/create")
  .post([authenticateUser, authorizePermissions("admin")], createProduct);
router
  .route("/uploadimg")
  .post([authenticateUser, authorizePermissions("admin")], uploadImage);
router
  .route("/:id")
  .get([authenticateUser, authorizePermissions("admin")], getOneProduct);
router
  .route("/update/:id")
  .patch([authenticateUser, authorizePermissions("admin")], updateProduct);
router
  .route("/delete/:id")
  .delete([authenticateUser, authorizePermissions("admin")], deleteProduct);

router.route("/:id/reviews").get(getOneProductReviews);

module.exports = router;
