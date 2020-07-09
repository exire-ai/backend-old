/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const adminUsersRouter = require("./routes/adminUsers");
const usersRouter = require("./routes/users");
const eventRouter = require("./routes/events");
const venueRouter = require("./routes/venues");
const planRouter = require("./routes/plans");
const notificationRouter = require("./routes/notifications");
const externalRouter = require("./routes/external");
const chatRouter = require("./routes/chats");
const merchantsRouter = require("./routes/merchants");
const stripeRouter = require("./routes/stripe");
const { TOKENS } = require("./config");

const app = express();

const tokenAuth = function (req, res, next) {
  if ("token" in req.headers) {
    if (TOKENS.includes(req.headers.token)) {
      next();
    } else {
      res.status(401).send({
        message: "Unauthorized token supplied.",
      });
    }
  } else {
    res.status(401).send({
      message: "No token supplied.",
    });
  }
};

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(tokenAuth);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/adminUsers", adminUsersRouter);
app.use("/users", usersRouter);
app.use("/events", eventRouter);
app.use("/venues", venueRouter);
app.use("/plans", planRouter);
app.use("/notifications", notificationRouter);
app.use("/external", externalRouter);
app.use("/chats", chatRouter);
app.use("/stripe", stripeRouter);
app.use("/merchants", merchantsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
