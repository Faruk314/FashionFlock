const router = require("express").Router();

const protect = require("../utils/protect");
const {
  getCart,
  removeFromCart,
  addToCart,
  createUserCart,
  increaseQuantity,
  decreaseQuantity,
} = require("../controllers/cartController");

router.get("/getcart", protect, getCart);

router.put("/removefromcart", protect, removeFromCart);

router.post("/createusercart", protect, createUserCart);

router.put("/addtocart", protect, addToCart);

router.put("/increaseQty", protect, increaseQuantity);

router.put("/decreaseQty", protect, decreaseQuantity);

module.exports = router;
