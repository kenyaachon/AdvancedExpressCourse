const express = require("express");

const router = express.Router();

module.exports = (params) => {
  const { speakers } = params;

  router.get("/", async (req, res) => {
    const speakerslist = await speakers.getList();
    const artwork = await speakers.getAllArtwork();
    return res.render("speakers", {
      page: "All Speakers",
      speakerslist,
      artwork,
    });
  });

  return router;
};
