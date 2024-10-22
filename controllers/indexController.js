const pool = require("../db/pool");
const db = require("../db/queries");
const passport = require("passport");

module.exports = {
  // GET REQUESTS
  get: (req, res) => {
    res.render("index", { user: req.user });
  },
  getRegister: (req, res, next) => {
    res.render("register");
  },
  getLogin: (req, res, next) => {
    res.render("login");
  },
  getLogout: (req, res) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  },

  // POST REQUESTS
  postRegister: async function (req, res) {
    try {
      const { first_name, last_name, username, email, password } = req.body;
      await db.addUser(first_name, last_name, username, email, password);
      res.redirect("/");
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  postLogin: passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
};
