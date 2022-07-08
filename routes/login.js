const bcrypt = require("bcrypt");
const joi = require("joi");
const express = require("express");
const { User } = require("../utils/mongoDB_Schemas");

const router = express.Router();

router.post("/", async (req, res) => {
  const error = await authenticateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const isValidPass = await bcrypt.compare(req.body.password, user.password);
  if (!isValidPass)
    return res.status(400).send("Invalid email or password.");

  const token = user.genrateAuthToken();
  res.send({token});
});

async function authenticateUser(user) {
  const schema = joi.object({
    email: joi.string().min(5).max(255).required().email(),
    password: joi.string().min(8).max(255).required(),
  });
  try {
    await schema.validateAsync(user);
  } catch (ex) {
    return ex;
  }
}

module.exports = router;
