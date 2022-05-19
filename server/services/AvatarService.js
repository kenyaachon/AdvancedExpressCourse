const sharp = require("sharp");
const uuidv4 = require("uuid/v4");
const util = require("util");
const path = require("path");
const fs = require("fs");

const fsUnlink = util.promisify(fs.unlink);

class AvatarService {
  constructor(directory) {
    this.directory = directory;
  }

  async store(buffer) {
    const filename = AvatarService.filename();
    const filepath = this.filepath(filename);

    //resizes the file, then stores it in the desire location
    await sharp(buffer)
      .resize(300, 300, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFile(filepath);
    return filename;
  }

  async delete(filename) {
    return fsUnlink(this.filepath(filename));
  }

  async thumbnail(filename) {
    return sharp(this.filepath(filename)).resize(50, 50).toBuffer();
  }

  static filename() {
    return `${uuidv4()}.png`;
  }

  filepath(filename) {
    return path.resolve(`${this.directory}/${filename}`);
  }
}

module.exports = AvatarService;
