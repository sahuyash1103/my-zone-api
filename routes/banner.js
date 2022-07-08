let express = require("express");
router = express.Router();

router.get("/", (req, res) => {
  res.send("banners list");
});

module.exports = router;
