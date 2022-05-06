/* eslint-disable global-require */

const fs = require("fs");
const path = require("path");
const util = require("util");

let AvatarService = null;
let db = null;

//configuration
const config = require("../../server/config").test;

const fsReaddir = util.promisify(fs.readdir);
const fsUnlink = util.promisify(fs.unlink);

async function deleteFilesInDir(directory) {
  const files = await fsReaddir(directory);
  const fileProm = [];
  files.forEach((file) => {
    fileProm.push(fsUnlink(path.join(directory, file)));
  });

  return Promise.all(fileProm);
}

module.exports.AvatarService = AvatarService;
module.exports.config = config;

module.exports.before = () => {
  return true;
};

module.exports.after = () => {
  //   return deleteFilesInDir(config.data.avatars);
  return true;
};
