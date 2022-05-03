const express = require("express");

const router = express.Router();

//Require the index file
const speakersRoute = require("./speakers");

module.exports = (params) => {
  // Destructuring assignment
  const { speakers } = params;

  //Now let's define the index route and mount it on slash
  router.get("/", async (req, res) => {
    const speakerslist = await speakers.getListShort();
    const artwork = await speakers.getAllArtwork();
    return res.render("index", { page: "Home", speakerslist, artwork });
  });

  //And mount it to the path speakers
  router.use("/speakers", speakersRoute(params));

  return router;
};
