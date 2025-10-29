const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");

const app = express();

const conn = require("./db/conn");

//Models
const Tough = require("./models/Tought");
const User = require("./models/User");

const toughtsRoutes = require("./routes/toughtsRoutes");
const ToughtsCotnroller = require("./controllers/ToughtsCotnroller");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

// body response
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(
  session({
    name: "session",
    secret: "our_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require("path").join(require("os").tmpdir(), "sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  })
);

app.use(flash());

app.use(express.static("public"));

app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }

  next();
});

app.use("toughts", toughtsRoutes);
app.get("/", ToughtsCotnroller.showToughts);
conn
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
