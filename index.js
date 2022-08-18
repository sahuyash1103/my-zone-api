// --------------------------------------IMPORTS
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const config = require("config");

const logger = require("./logger/logger");

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

//---------------------------------------CORS OPTIONS
const corsOptions = {};

const app = express();
app.use(cors(corsOptions));

//-----------------------------------CHECKING ENV VARIABLES
if (!config.get("jwtPrivateKey")) {
  logger.error("FATAL ERROR: jwtPrivate key is not defined.");
  process.exit(1);
}

if (!config.get("mongoURL")) {
  logger.error("FATAL ERROR: mongo url is not defined.");
  process.exit(1);
}

//------------------------------------DB CONNECTION
let mongoURL = config.get("mongoURL");
if (mongoURL.slice(-1) === "/") {
  mongoURL = mongoURL.slice(0, -1);
}

mongoose
  .connect(mongoURL)
  .then(() => logger.info("Connected to mongoDB..."))
  .catch((err) => logger.error(`Error while connecting to mongoDB: ${err}`));

// -----------------------------------MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

if (process.env.NODE_ENV === "development") {
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

// ---------------------------------------HOME ROUTE
app.get("/api", (req, res) => {
  res.send({ conected: true, message: "server is running well" });
});

app.get("/api/about-me", auth, async (req, res) => {
  const user = await User.findById(req.user._id)
    .select(["-password", "-__v"])
    .populate("cart");
  res.send(user);
});

// ---------------------------------------LISTNING TO CLIENTS
app.listen(process.env.PORT || 3001, () =>
  logger.info(`server is listning....`)
);
