//---------------------------IMPORTS-----------------------------------------------------
const { customLevels, customFormat, customTransports } = require("./config");
const winston = require("winston");
const { createLogger, format } = winston;
const { combine, timestamp, label } = format;

//---------------------------------------LOGGER------------------------------------------------
const superLogger = () => {
  winston.addColors(customLevels.colors);

  const options = {
    levels: customLevels.levels,
    level: "secret",
    format: combine(label({ label: "Secret" }), timestamp(), customFormat),
    defaultMeta: { service: "user-service" },
    transports: customTransports,
  };

  return createLogger(options);
};

module.exports = superLogger;
