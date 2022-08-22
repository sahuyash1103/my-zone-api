const config = require("config");

const node_env = config.get("node_env") || process.env.NODE_ENV;
const port = config.get("port") || process.env.PORT;
const mongoURL = config.get("mongoURL") || process.env.MY_ZONE_MONGO_URL;
const jwtPrivateKey = config.get("jwtPrivateKey") || process.env.MY_ZONE_JWT_PRIVATE_KEY;

module.exports = {
  node_env,
  port,
  mongoURL,
  jwtPrivateKey,
};