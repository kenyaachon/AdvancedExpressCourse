#!/usr/bin/env node

/**
 * Module dependencies
 */

const http = require("http");
const config =
  require("../server/config")[process.env.NODE_ENV || "development"];
const app = require("../server/app")(config);
const db = require("../server/lib/db");

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

//connect to the database before accepting requests
db.connect(config.database.dsn)
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(port);
  })
  .catch((err) => {
    console.error(err);
  });

//initialize the server
// server.listen(port);
server.on("listening", () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
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
      console.error(`${bind} requires elevated privilages`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      console.log(error);
    //throw error
  }
});
