const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");
const { log } = require("console");
const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProduct = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ count: products.length, products });
};

const getOneProduct = async (req, res) => {
  const { id: productId } = req.params;
  console.log(req.params);
  const product = await Product.find({ _id: productId }).populate("reviews");
  if (!product) {
    throw new CustomError.NotFoundError(`No product found with id ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true
  });
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }
  await product.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Product removed." });
};

const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError("No file uploaded");
  }
  const productImg = req.files.img;
  if (!productImg.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Not an image");
  }
  const maxSize = 1024 * 1024;
  if (productImg.size > maxSize) {
    throw new CustomError.BadRequestError("Image size too large");
  }
  const imgPath = path.join(__dirname, "../public/uploads/" + productImg.name);
  await productImg.mv(imgPath);
  res.status(StatusCodes.OK).json({ img: `/uploads/${productImg.name}` });
};

module.exports = {
  createProduct,
  getAllProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
  uploadImage
};
