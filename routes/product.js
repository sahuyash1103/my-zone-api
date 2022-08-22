const express = require("express");
const { Product } = require("../utils/mongoDB_Schemas");

router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

router.get("/product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id); //await Product.findById();
  res.send(product);
});

module.exports = router;
