const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const { string } = require("joi");

//--------------------------------------------SCHEMAS
const userSchema = mongoose.Schema({
  username: { type: String, required: true, minlength: 5, maxlength: 25 },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },
  address: { type: String, minlength: 5, maxlength: 1024 },
  orders: [mongoose.Types.ObjectId],
  cart: [mongoose.Types.ObjectId],
});

const productSchema = mongoose.Schema({
  title: { type: String, required: true, minlength: 5, maxlength: 25 },
  images: { type: [String], required: true },
  price: { type: String, required: true },
  rating: Number,
});

const bannersSchema = mongoose.Schema({
  title: { type: String, required: true },
  banner: { type: [String], required: true },
  description: String,
});

//-----------------------------------------------------METHODES
userSchema.methods.genrateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email },
    config.get("jwtPrivateKey")
  );
};

//------------------------------------------------------MODELS
const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);
const Banner = mongoose.model("Banner", bannersSchema);

module.exports = {
  User,
  Product,
  Banner,
};
