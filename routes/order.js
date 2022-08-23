const express = require("express");
const auth = require("../middlewares/auth");
const { User } = require("../utils/mongoDB_Schemas");

router = express.Router();

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id)
    .select(["orders", "-_id"])
    .populate("orders.products");
  if (!user) return res.status(400).send("invalid token");

  res.send(user);
});

router.get("/order/:id", auth, async (req, res) => {
  try {
    const user = await User.findOne({ "orders._id": req.params.id }).select([
      "orders",
      "-_id",
    ]);
    if (!user) return res.status(400).send("can't find you order.");

    res.send(user.orders);
  } catch (error) {
    res.status(400).send("invalid order id.")
  }
});

module.exports = router;
