const express = require("express");

const router = express.Router();

module.exports = (params) => {
  const { feedback } = params;

  router.get("/", async (req, res, next) => {
    try {
      const feedbacklist = await feedback.getList();
      return res.render("feedback", {
        page: "Feedback",
        feedbacklist,
        success: req.query.success,
      });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
