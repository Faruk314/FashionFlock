const Cart = require("../models/CartModel");
const protect = require("../utils/protect");
const AsyncHandler = require("express-async-handler");
const Product = require("../models/ProductModel");

const getCart = AsyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    res.status(400);
    throw new Error("Cart not found");
  }

  res.status(200).json(cart.products);
});

const removeFromCart = AsyncHandler(async (req, res) => {
  const { _id } = req.body;

  const cart = await Cart.findOne({
    userId: req.user._id,
  });

  let product = cart.products.find((p) => p._id.toString() === _id.toString());

  if (!product) {
    res.status(404);
    throw new Error("product not found!");
  }
  if (!cart) {
    res.status(404);
    throw new Error("Cart not found!");
  }

  const updatedCart = await Cart.updateOne({
    $pull: { products: product },
  });

  res.json(updatedCart);
});

const addToCart = AsyncHandler(async (req, res) => {
  const { productId, title, size, quantity, price, image } = req.body;

  const cartExists = await Cart.findOne({
    userId: req.user._id,
  });

  if (!cartExists) {
    const userCart = await Cart.create({
      userId: req.user._id,
      products: [],
    });
  }

  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    res.status(400);
    throw new Error("Cart not found");
  }

  const prodInCart = cart.products.find(
    (p) => p.size === size && p.productId.toString() === productId.toString()
  );

  if (!prodInCart) {
    const updatedCart = await Cart.updateOne(
      { userId: req.user._id },
      {
        $push: { products: { productId, size, title, quantity, price, image } },
      }
    );
    res.json(updatedCart);
  } else {
    let newQuantity = prodInCart.quantity + quantity;
    const updatedCart = await Cart.updateOne(
      {
        products: { $elemMatch: { productId: productId } },
      },

      {
        $set: { "products.$.quantity": newQuantity },
      }
    );

    res.json(updatedCart);
  }
});

const increaseQuantity = AsyncHandler(async (req, res) => {
  const { _id, size } = req.body;

  const cart = await Cart.findOne({ userId: req.user._id });

  const prodInCart = cart.products.find(
    (p) => p.size === size && p._id.toString() === _id.toString()
  );

  let newQuantity = 1;

  newQuantity = prodInCart.quantity + 1;

  let updatedCart = await Cart.updateOne(
    {
      products: { $elemMatch: { _id: _id } },
    },

    {
      $set: { "products.$.quantity": newQuantity },
    }
  );
  res.json(updatedCart);
});

const decreaseQuantity = AsyncHandler(async (req, res) => {
  const { _id, size } = req.body;
  let newQuantity = 1;

  const cart = await Cart.findOne({ userId: req.user._id });

  const prodInCart = cart.products.find(
    (p) => p.size === size && p._id.toString() === _id.toString()
  );

  prodInCart.quantity > 1
    ? (newQuantity = prodInCart.quantity - 1)
    : newQuantity;

  let updatedCart = await Cart.updateOne(
    {
      products: { $elemMatch: { _id: _id } },
    },

    {
      $set: { "products.$.quantity": newQuantity },
    }
  );
  res.json(updatedCart);
});

const createUserCart = AsyncHandler(async (req, res) => {
  const { userId, products } = req.body;

  if (!products) {
    res.status(400);
    throw new Error("There are no products in cart");
  }

  const userCart = await Cart.findOne({ userId });

  if (userCart) {
    const updatedCart = await Cart.updateOne(
      { userId },
      { $push: { products: { $each: products } } }
    );

    res.json(updatedCart);
    return;
  } else {
    const userCart = await Cart.create({
      userId,
      products,
    });
  }

  res.status(200).json(userCart);
});

module.exports = {
  getCart,
  removeFromCart,
  addToCart,
  createUserCart,
  increaseQuantity,
  decreaseQuantity,
};
