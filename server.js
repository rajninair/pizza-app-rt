require("dotenv").config();

const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const initRoutes = require("./routes/web");
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongoStore = require("connect-mongo");

// Database connection
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "connection error: "));
connection.once("open", function () {
  console.log("Database Connected successfully");
  console.log("PORT", process.env.PORT);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || "topsecretabcdedffddff",
    resave: false,
    store: MongoStore.create({
      client: connection.getClient(),
    }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
    // cookie: { maxAge: 1000 * 10 } // 10 minutes
  })
);

app.use(flash());

// Static Assets
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Global middleware
app.use((req, res, next) => {
  console.log("req.session 1 >>> ", req.session);
  console.log("res.locals 1 >>> ", res.locals);
  res.locals.session = req.session;
  res.locals.user = req.user;
  console.log("req.session 2 >>> ", req.session);
  console.log("res.locals 2 >>> ", res.locals);
  next();
});

// set Template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

initRoutes(app);

// app.use((req, res) => {
//   res.status(404).render("errors/404");
// });

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
