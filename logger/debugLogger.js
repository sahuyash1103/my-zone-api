//---------------------------IMPORTS-----------------------------------------------------
const { customLevels, customFormat, customTransports } = require("./config");
const winston = require("winston");
const { createLogger, format } = winston;
const { combine, timestamp, label } = format;

//---------------------------------------LOGGER------------------------------------------------
const debugLogger = () => {
  winston.addColors(customLevels.colors);

  const options = {
    levels: customLevels.levels,
    level: "debug",
    format: combine(
      label({ label: "Debug" }),
      timestamp({ format: "HH:MM:SS" }),
      customFormat
    ),
    defaultMeta: { service: "user-service" },
    transports: customTransports,
  };

  return createLogger(options);
};

module.exports = debugLogger;
