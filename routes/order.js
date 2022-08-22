const express = require('express');
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

router.get("/order/:id", auth, async  (req, res) => {
  res.send(`order object of id: ${req.params.id}`);
});

module.exports = router;