const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  categorie: {
    type: String,
    required: true,
  },
  sizes: {
    type: Array,
    required: true,
  },
  featured: {
    type: Boolean,
  },
});

const Model = mongoose.model("Product", ProductSchema);

module.exports = Model;
