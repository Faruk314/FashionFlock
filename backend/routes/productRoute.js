const router = require("express").Router();
const protect = require("../utils/protect");
const Product = require("../models/ProductModel");
const AsyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const Cart = require("../models/CartModel");
const {
  createProduct,
  getproducts,
  getProduct,
  getFeaturedProducts,
} = require("../controllers/productController");

router.post("/createproduct", createProduct);

router.get("/getFeaturedProducts", getFeaturedProducts);

router.get("/getproducts/:categorie/:page", getproducts);

router.get("/getproduct/:id", getProduct);

module.exports = router;
