const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

class SpeakerService {
  constructor(datafile) {
    this.datafile = datafile;
  }

  async getData() {
    const data = await readFile(this.datafile, "utf8");
    return JSON.parse(data).speakers;
  }
}

module.exports = SpeakerService;
