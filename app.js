/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var adminUsersRouter = require("./routes/adminUsers");
var usersRouter = require("./routes/users");
var eventRouter = require("./routes/events");
var venueRouter = require("./routes/venues");
var planRouter = require("./routes/plans");
var notificationRouter = require("./routes/notifications");
var externalRouter = require("./routes/external");
var chatRouter = require("./routes/chats");
var stripeRouter = require("./routes/stripe");

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

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

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

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
