const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class FeedbackService {
  constructor(datafile) {
    this.datafile = datafile;
  }
}

module.exports = FeedbackService;
