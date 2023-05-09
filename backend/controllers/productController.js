const protect = require("../utils/protect");
const AsyncHandler = require("express-async-handler");
const Product = require("../models/ProductModel");
const MinioClient = require("../utils/minioClient");

const createProduct = AsyncHandler(async (req, res) => {
  const { title, desc, price, image, categorie, sizes } = req.body;

  if (!title || !desc || !image || !price) {
    res.status(400);
    throw new Error("[createProduct]: All fields must be filled");
  }

  const product = await Product.create({
    title,
    desc,
    price,
    image,
    categorie,
    sizes,
  });

  if (product) {
    res.status(200).json({
      title,
      desc,
      price,
      image,
      categorie,
      sizes,
    });
  } else {
    res.status(400);
    throw new Error("Product not saved");
  }
});

const getproducts = AsyncHandler(async (req, res) => {
  const page = Number(req.params.page) || 1;
  const pageSize = 4;
  const skip = (page - 1) * pageSize;

  const count = await Product.countDocuments({
    categorie: req.params.categorie,
  });

  const products = await Product.find({ categorie: req.params.categorie })
    .skip(skip)
    .limit(pageSize);

  if (!products) {
    res.status(400);
    throw new Error("There is no products");
  }

  Promise.all(
    products.map((product) => {
      return new Promise((resolve, reject) => {
        if (product.image) {
          MinioClient.presignedUrl(
            "GET",
            "ecommerc-site",
            product.image,
            24 * 60 * 60,
            function (err, presignedUrl) {
              if (!err) {
                product.image = presignedUrl;
                resolve();
              } else {
                reject(err);
              }
            }
          );
        } else {
          resolve();
        }
      });
    })
  ).then(() => {
    res
      .status(200)
      .json({ products, page, pages: Math.ceil(count / pageSize) });
  });
});

const getProduct = AsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  if (product.image) {
    MinioClient.presignedUrl(
      "GET",
      "ecommerc-site",
      product.image,
      24 * 60 * 60,
      function (err, presignedUrl) {
        if (!err) {
          product.image = presignedUrl;
        }
        console.log(err);
      }
    );
  }

  res.status(200).json(product);
});

const getFeaturedProducts = AsyncHandler(async (req, res) => {
  const products = await Product.find({ featured: true });

  if (!products) {
    res.status(400);
    throw new Error("There is no products");
  }

  Promise.all(
    products.map((product) => {
      return new Promise((resolve, reject) => {
        if (product.image) {
          MinioClient.presignedUrl(
            "GET",
            "ecommerc-site",
            product.image,
            24 * 60 * 60,
            function (err, presignedUrl) {
              if (!err) {
                product.image = presignedUrl;
                resolve();
              } else {
                reject(err);
              }
            }
          );
        } else {
          resolve();
        }
      });
    })
  ).then(() => {
    res.status(200).json(products);
  });
});

module.exports = {
  createProduct,
  getproducts,
  getProduct,
  getFeaturedProducts,
};
