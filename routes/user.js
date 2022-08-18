const express = require("express");
const joi = require("joi");
const auth = require("../middlewares/auth");
const { User } = require("../utils/mongoDB_Schemas");

router = express.Router();

router.get("/cart", auth, async (req, res) => {
  const user = await User.findById(req.user._id)
    .select(["-password", "-__v"])
    .populate("cart");
  if (!user) return res.status(400).send("invalid token.");

  res.send(user.cart);
});

router.patch("/add-to-cart", auth, async (req, res) => {
  const error = await validateCart(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.user._id).select(["-password", "-__v"]);
  if (!user) return res.status(400).send("invalid token");

  user.cart.push(req.body.product_id);
  user.save();
  res.send({ cart: user.cart.length });
});

router.patch("/remove-from-cart", auth, async (req, res) => {
  console.log(req.body);
  const error = await validateCart(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.user._id).select(["-password", "-__v"]);
  if (!user) return res.status(400).send("invalid token");

  user.cart.pop(req.body.product_id);
  user.save();
  res.send({ cart: user.cart.length });
});

async function validateCart(cart) {
  const schema = joi.object({
    product_id: joi.string().required(),
  });

  try {
    await schema.validateAsync(cart);
  } catch (ex) {
    return ex;
  }
}

module.exports = router;
