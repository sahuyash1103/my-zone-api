// --------------------------------------IMPORTS
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const config = require("config");

const auth = require("./middlewares/auth");
const { User } = require("./utils/mongoDB_Schemas");

const app = express();

//-----------------------------------CHECKING ENV VARIABLES
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivate key is not defined.");
  process.exit(1);
}

if (!config.get("mongoURL")) {
  console.error("FATAL ERROR: mongo url is not defined.");
  process.exit(1);
}

// -----------------------------------IMPORT ROUTES
const banners = require("./routes/banner");
const login = require("./routes/login");
const signup = require("./routes/signup");
const product = require("./routes/product");
const order = require("./routes/order");

//------------------------------------DB CONNECTION
let mongoURL = config.get("mongoURL");
if (mongoURL.slice(-1) === "/") {
  mongoURL = mongoURL.slice(0, -1);
}

mongoose
  .connect(mongoURL)
  .then(() => console.log("Connected to mongoDB..."))
  .catch((err) => console.error("Error while connecting to mongoDB: " + err));

// -----------------------------------MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("morgan is enabled");
}

// ---------------------------------------EXPORTED ROUTES
app.use("/api/banners", banners);
app.use("/api/login", login);
app.use("/api/signup", signup);
app.use("/api/products", product);
app.use("/api/orders", order);

// ---------------------------------------HOME ROUTE
app.get("/api", (req, res) => {
  res.send({ conected: true, message: "server is running well" });
});

app.get("/api/about-me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select(["-password", "-__v"]);
  res.send(user);
});

// ---------------------------------------LISTNING TO CLIENTS
app.listen(3001, () =>
  console.log(`server is listning at http://localhost:3001/api`)
);
