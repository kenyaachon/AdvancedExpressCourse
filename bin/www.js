#!/usr/bin/env node

/**
 * Module dependencies
 */

const http = require("http");
const config =
  require("../server/config")[process.env.NODE_ENV || "development"];
const app = require("../server/app")(config);
const db = require("../server/lib/db");

const log = config.log();

//Helper functions

/**
 * Normalize a port into a number, string, or false
 *
 */

function normalizePort(value) {
  const port = parseInt(value, 10);

  if (Number.isNaN(port)) {
    //named pipe
    return value;
  }

  if (port >= 0) {
    //port number
    return port;
  }

  return false;
}

/**
 * Get port from environment and store in Express
 */

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// Create HTTP server and listen on the provided port
const server = http.createServer(app);

//connect to the datfabase before accepting requests
db.connect(config.database.dsn)
  .then(() => {
    log.info("Connected to MongoDB");
    server.listen(port);
  })
  .catch((err) => {
    log.fatal(err);
  });

//initialize the server
// server.listen(port);
server.on("listening", () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  log.info(`Listening on ${bind}`);
});

//Handle server errors
server.on("error", (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `pipe ${port}` : `port ${port}`;

  //handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      log.fatal(`${bind} requires elevated privilages`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      log.fatal(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      log.info(error);
    //throw error
  }
});
