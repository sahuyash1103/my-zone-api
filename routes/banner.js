const express = require("express");
const { Banner } = require("../utils/mongoDB_Schemas");

router = express.Router();

router.get("/", async (req, res) => {
  const banners = await Banner.find();
  res.send(banners);
});

module.exports = router;
