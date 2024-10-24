const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

// POST ROUTES
indexRouter.post("/login", indexController.postLogin);
indexRouter.post("/register", indexController.postRegister);
indexRouter.post("/sendMessage", indexController.postSendMessage);
indexRouter.post(
  "/deleteMessage/:message_id",
  indexController.postDeleteMessage
);
// GET ROUTES
indexRouter.get("/login", indexController.getLogin);
indexRouter.get("/register", indexController.getRegister);
indexRouter.get("/logout", indexController.getLogout);
indexRouter.get("/sendMessage", indexController.getSendMessage);
indexRouter.get("/", indexController.get);

module.exports = indexRouter;
