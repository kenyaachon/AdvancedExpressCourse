const express = require("express");
const passport = require("passport");

const UserModel = require("../../models/UserModel");
const middleware = require("../middleware");

const router = express.Router();

const redirectIfLoggedIn = (req, res, next) => {
  if (req.user) return res.redirect("/users/account");
  return next();
};
module.exports = (params) => {
  const { avatars } = params;
  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/users/login?error=true",
    })
  );

  router.get("/login", redirectIfLoggedIn, (req, res) =>
    res.render("users/login", { error: req.query.error })
  );

  router.get("/logout", (req, res) => {
    req.logout();

    return res.redirect("/");
  });
  router.get("/registration", redirectIfLoggedIn, (req, res) =>
    res.render("users/registration", {
      success: req.query.success,
    })
  );

  //upload.single represnts the field we are looking
  //in the updated data
  router.post(
    "/registration",
    middleware.upload.single("avatar"),
    middleware.handleAvatar(avatars),
    async (req, res, next) => {
      try {
        const user = new UserModel({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        });

        if (req.file && req.file.storedFilename) {
          user.avatar = req.file.storedFilename;
        }
        //save() is a built-in function from mongo
        const savedUser = await user.save();
        if (savedUser) return res.redirect("/users/registration?success=true");
        return next(new Error("Failed to save user for unknown reasons"));
      } catch (err) {
        if (req.file && req.file.storedFilename) {
          await avatars.delete(req.file.storedFilename);
        }
        return next(err);
      }
    }
  );

  //should only be accessible for authorized users
  router.get(
    "/account",
    (req, res, next) => {
      //check if the user is logged in
      if (req.user) return next();
      return res.status(401).end();
    },
    (req, res) =>
      res.render("users/account", {
        user: req.user,
      })
  );

  router.get("/avatar/:filename", (req, res) => {
    res.type("png");
    return res.sendFile(avatars.filepath(req.params.filename));
  });

  router.get("/avatartn/:filename", async (req, res) => {
    res.type("png");
    const thumbnail = await avatars.thumbnail(req.params.filename);
    return res.end(thumbnail, "binary");
  });

  return router;
};
