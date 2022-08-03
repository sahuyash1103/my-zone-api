const express = require("express");
const { Product } = require("../utils/mongoDB_Schemas");

router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

router.get("/product/:id", (req, res) => {
  const products = 0; //await Product.findById();
  res.send(products);
});

module.exports = router;
