//---------------------------IMPORTS-----------------------------------------------------
const { customLevels, customFormat, customTransports } = require("./config");
const winston = require("winston");
const { createLogger, format } = winston;
const { combine, timestamp, label } = format;

//---------------------------------------LOGGER------------------------------------------------
const devLogger = () => {
  winston.addColors(customLevels.colors);

  const options = {
    levels: customLevels.levels,
    level: "info",
    format: combine(
      label({ label: "Dev" }),
      timestamp({ format: "HH:MM:SS" }),
      customFormat
    ),
    defaultMeta: { service: "user-service" },
    transports: customTransports,
  };

  return createLogger(options);
};

module.exports = devLogger;
