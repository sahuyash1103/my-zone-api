const express = require("express");
const logger = require("../logger/logger");
const auth = require("../middlewares/auth");
const { User } = require("../utils/mongoDB_Schemas");

router = express.Router();

router.patch("/add-to-cart", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select(["-password", "-__v"]);
  user.cart.push(req.body.product_id);
  user.save();
  res.send(user.cart);
});

module.exports = router;
