const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const path = require("node:path");
const PORT = 3000;
const indexRouter = require("./routes/indexRouter");
const assetsPath = path.join(__dirname, "public");
require("dotenv").config();
const pg = require("pg");
const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);
const pool = require("./db/pool");
const passport = require("passport");

// EJS TEMPLATE SETUP
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(expressLayouts);
app.set("layout", "layout");

// EXPRESS SETUP
app.use(express.static(assetsPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EXPRESS-PASSPORT-PG DATABASE SESSION
app.use(
  expressSession({
    store: new pgSession({
      pool: pool,
      tableName: "user_sessions",
      createTableIfMissing: true,
    }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

// PASSPORT AUTHENTICATION
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// ROUTES
app.use("/", indexRouter);

// SERVER
app.listen(PORT, () => console.log(`Express app - listening on port ${PORT}`));
