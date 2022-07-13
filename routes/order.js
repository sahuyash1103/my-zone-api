let express = require('express');

router = express.Router();

router.get("/", (req, res) => {
  res.send("orders object");
});

router.get("/order/:id", (req, res) => {
  res.send(`order object of id: ${req.params.id}`);
});

module.exports = router;