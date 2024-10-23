const db = require("../db/queries");
const passport = require("passport");
const genPassword = require("../lib/passwordUtils").genPassword;
const { validationResult } = require("express-validator");
const validateRegister = require("../validators/registerValidator");

module.exports = {
  // GET REQUESTS
  get: (req, res) => {
    res.render("index", { user: req.user });
  },
  getRegister: (req, res, next) => {
    res.render("register", {
      formData: {},
      errors: [],
    });
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
  postRegister: [
    validateRegister,
    async function (req, res) {
      console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("register", {
          errors: errors.array(),
          formData: req.body,
        });
      }
      try {
        const { first_name, last_name, username, email, password, is_admin } =
          req.body;
        const hashedPassword = await genPassword(password);
        const membership_status = is_admin ? "admin" : "user";
        await db.addUser(
          first_name,
          last_name,
          username,
          email,
          hashedPassword,
          membership_status
        );
        res.redirect("/");
      } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Internal Server Error");
      }
    },
  ],
  postLogin: passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
};
