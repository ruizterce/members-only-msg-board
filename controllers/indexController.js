const db = require("../db/queries");
const passport = require("passport");
const genPassword = require("../lib/passwordUtils").genPassword;
const { validationResult } = require("express-validator");
const validateRegister = require("../validators/registerValidator");

module.exports = {
  // GET REQUESTS
  get: async (req, res) => {
    const messages = await db.getAllMessages();
    res.render("index", { messages: messages });
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
  getSendMessage: (req, res, next) => {
    res.render("sendMessage");
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
  postSendMessage: async function (req, res) {
    const { title, message } = req.body;
    try {
      await db.addMessage(title, message, req.user.user_id);
      res.redirect("/");
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  postDeleteMessage: async function (req, res) {
    if (req.user.membership_status !== "admin") {
      return res.status(403).send("Unauthorized");
    }
    try {
      await db.deleteMessageById(req.params.message_id);
      res.redirect("/");
    } catch {
      console.error("Error deleting message:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};
