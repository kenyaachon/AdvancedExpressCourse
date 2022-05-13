const mongoose = require("mongoose");

// dsn = Database Connection String
module.exports.connect = async (dsn) =>
  mongoose.connect(dsn, {
    useNewUrlParser: true,
  });
