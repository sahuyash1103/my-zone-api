const express = require("express");
const joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../utils/mongoDB_Schemas");
const _ = require("lodash");

const router = express.Router();

router.post("/", async (req, res) => {
  const error = await validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User is already registered.");

  user = User(_.pick(req.body, ["username", "email", "password"]));

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(req.body.password, salt);
  await user.save();

  const token = user.genrateAuthToken();
  res.header("x-auth-token", token).send(_.pick(user, ["username", "email"]));
});

async function validateUser(user) {
  const schema = joi.object({
    username: joi.string().min(5).max(25).required(),
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
