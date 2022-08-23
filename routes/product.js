const express = require("express");
const { Product } = require("../utils/mongoDB_Schemas");

router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

router.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(400).send("can't find the product");

    res.send(product);
  } catch (error) {
    res.status(400).send("invalid product id.")
  }
});

module.exports = router;
