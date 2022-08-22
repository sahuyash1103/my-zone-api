// --------------------------------------IMPORTS
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");

require("dotenv").config();

const logger = require("./logger/logger");
const {
  mongoURL,
  jwtPrivateKey,
  node_env,
  port,
} = require("./utils/env_config");

const auth = require("./middlewares/auth");
const header = require("./middlewares/setHeader");
const { User } = require("./utils/mongoDB_Schemas");

// -----------------------------------IMPORT ROUTES
const banners = require("./routes/banner");
const login = require("./routes/login");
const signup = require("./routes/signup");
const product = require("./routes/product");
const order = require("./routes/order");
const user = require("./routes/user");
const buy = require("./routes/buy");

//---------------------------------------CORS OPTIONS
const corsOptions = {};

const app = express();
app.use(cors(corsOptions));

//-----------------------------------CHECKING ENV VARIABLES
if (!jwtPrivateKey) {
  logger.error("FATAL ERROR: jwtPrivate key is not defined.");
  process.exit(1);
}

if (!mongoURL) {
  logger.error("FATAL ERROR: mongo url is not defined.");
  process.exit(1);
}

//------------------------------------DB CONNECTION
mongoose
  .connect(mongoURL)
  .then(() => logger.info("Connected to mongoDB..."))
  .catch((err) => logger.error(`Error while connecting to mongoDB: ${err}`));

// -----------------------------------MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

if (node_env === "development") {
  app.use(morgan("tiny"));
  logger.info("morgan is enabled");
}

app.use(header);

// ---------------------------------------EXPORTED ROUTES
app.use("/api/banners", banners);
app.use("/api/login", login);
app.use("/api/signup", signup);
app.use("/api/products", product);
app.use("/api/orders", order);
app.use("/api/user", user);
app.use("/api/buy", buy);

// ---------------------------------------HOME ROUTE
app.get("/api", (req, res) => {
  res.send({ conected: true, message: "server is running well" });
});

app.get("/api/about-me", auth, async (req, res) => {
  const user = await User.findById(req.user._id)
    .select(["-password", "-__v", "-orders"])
    .populate("cart");
  if (!user) return res.status(400).send("invalid token");

  res.send(user);
});

// ---------------------------------------LISTNING TO CLIENTS
app.listen(port || 3001, () => logger.info(`server is listning....`));
