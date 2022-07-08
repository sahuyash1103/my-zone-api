const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

//--------------------------------------------SCHEMAS
const userSchema = mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 25 },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },
  address: { type: String, minlength: 5, maxlength: 1024 },
  orders: [mongoose.Types.ObjectId],
});

//-----------------------------------------------------METHODES
userSchema.methods.genrateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email },
    config.get("jwtPrivateKey")
  );
};

//------------------------------------------------------MODELS
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
