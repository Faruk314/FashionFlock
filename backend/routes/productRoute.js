const router = require("express").Router();

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
