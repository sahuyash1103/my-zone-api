let express = require('express');
router = express.Router();

router.get("/", (req, res) => {
  res.send("products object");
});

router.get("/product/:id", (req, res) => {
  res.send(`product object of id: ${req.params.id}`);
});

module.exports = router;
