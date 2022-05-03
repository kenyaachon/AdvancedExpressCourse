require("dotenv").config();

const path = require("path");

module.exports = {
  development: {
    sitename: "Roux Meetups [Development]",
    data: {
      speakers: path.join(__dirname, "../data/speakers.json"),
      feedback: path.join(__dirname, "../data/feedback.json"),
      avatars: path.join(__dirname, "../data/avatars"),
    },
    database: {
      dsn: process.env.DEVELOPMENT_DB_DSN,
    },
  },
  production: {
    sitename: "Roux Meetups",
    data: {
      speakers: path.join(__dirname, "../data/speakers.json"),
      feedback: path.join(__dirname, "../data/feedback.json"),
      avatars: path.join(__dirname, "../data/avatars"),
    },
    database: {
      dsn: process.env.PRODUCTION_DB_DSN,
    },
  },
};