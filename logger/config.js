const { format, transports } = require("winston");
const { combine, timestamp, label, printf, colorize } = format;

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
    secret: 5,
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "white",
    http: "blue",
    debug: "green",
    secret: "cyan",
  },
  bgColors: {
    error: "blackBG",
    warn: "blackBG",
    info: "blackBG",
    http: "blackBG",
    debug: "blackBG",
    secret: "blackBG",
  },
};

const customFormat = printf(({ level, message, label, timestamp }) => {
  return `[${label}] --> [${level}] : [${message}] --> [${timestamp}]`;
});

const customTransports = [
  process.env.NODE_ENV === "production"
    ? new transports.Console()
    : new transports.Console({
        format: combine(
          colorize(),
          label({ label: "Dev" }),
          timestamp({ format: "HH:MM:SS" }),
          customFormat
        ),
      }),
  new transports.File({ filename: "error.log", level: "error" }),
  new transports.File({ filename: "combined.log" }),
];

module.exports = { customLevels, customFormat, customTransports };
