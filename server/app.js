const express = require("express");
const path = require("path");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const routes = require("./routes");
// const SpeakerService = require("./services/SpeakerService");
// const FeedbackService = require("./services/FeedbackService");

module.exports = (config) => {
  const app = express();
  // const speakers = new SpeakerService(config.data.speakers);
  // const feedback = new FeedbackService(config.data.feedback);
  // app.set("view engine", "pug");
  // app.set("views", path.join(__dirname, "./views"));

  return app;
};
