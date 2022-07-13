//---------------------------IMPORTS-----------------------------------------------------
const { customLevels, customFormat, customTransports } = require("./config");
const winston = require("winston");
const { createLogger, format } = winston;
const { combine, timestamp, label } = format;

//---------------------------------------LOGGER------------------------------------------------
const prodLogger = () => {
  winston.addColors(customLevels.colors);

  const options = {
    levels: customLevels.levels,
    level: "warn",
    format: combine(
      label({ label: "Prod" }),
      timestamp(),
      customFormat
    ),
    defaultMeta: { service: "user-service" },
    transports: customTransports,
  };

  return createLogger(options);
};

module.exports = prodLogger;
