const prodLogger = require("./prodLogger");
const devLogger = require("./devLogger");
const debugLogger = require("./debugLogger");
const superLogger = require("./superLogger");

let logger = null;

if (process.env.WINSTON === "production") {
  logger = prodLogger();
}
if (process.env.WINSTON === "development") {
  logger = devLogger();
}
if (process.env.WINSTON === "debug") {
  logger = debugLogger();
}
if (process.env.WINSTON === "super") {
  logger = superLogger();
}

module.exports = logger;
