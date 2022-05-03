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

  async getNames() {
    const data = await this.getData();
    return data.map((speaker) => ({
      name: speaker.name,
      shortname: speaker.shortname,
    }));
  }

  async getList() {
    const data = await this.getData();
    return data.map((speaker) => ({
      name: speaker.name,
      shortname: speaker.shortname,
      title: speaker.title,
      summary: speaker.summary,
    }));
  }

  async getAllArtwork() {
    const data = await this.getData();
    const artwork = data.reduce((acc, elm) => {
      if ((elm, artwork)) {
        return [...acc, ...elm.artwork];
      }
      return acc;
    }, []);
    return artwork;
  }
}

module.exports = SpeakerService;
