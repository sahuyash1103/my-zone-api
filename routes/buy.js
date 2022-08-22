const express = require("express");
const joi = require("joi");
const auth = require("../middlewares/auth");
const { Product, User } = require("../utils/mongoDB_Schemas");

router = express.Router();

router.post("/", auth, async (req, res) => {
  const error = await validateBuy(req.body);
  if (error) return res.status(400).send(error);

  const user = await User.findById(req.user._id);
  if (!user) return res.status(400).send("invalid token");

  user.orders.push(req.body);
  user.save();
  res.send({ orders: user.orders });
});

router.get("/product/:id", async (req, res) => {
  const { product, token } = req.body;
});

router.post("/payment", auth, async (req, res) => {});

module.exports = router;

async function validateBuy(order) {
  const schema = joi.object({
    products: joi.array().items(joi.string()).required(),
    total: joi.string().required(),
  });

  try {
    await schema.validateAsync(order);
  } catch (ex) {
    return ex;
  }
}
