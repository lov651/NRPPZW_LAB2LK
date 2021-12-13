const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const port = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: { httpOnly: true },
  })
);

app.get("/", (req, res) => {
  if (req.query.formres != null) {
    console.log("KOKER JE: " + req.session.cookie);
    console.log("IDER JE: " + req.sessionID);
    res.render("pages/index", { testtext: req.query.formres });
  } else {
    console.log("KOKER JE: " + req.sessionID);
    console.log("IDER JE: " + req.session.cookie);
    console.log("Normalno");
    res.render("pages/index", { testtext: "empty" });
  }
});

app.get("/vulnerableXSS", (req, res) => {
  res.clearCookie(`Safe cookie`);
  res.cookie(`Vulnerable cookie`, `vulnerable cookie encryption`);
  console.log("Sad je nesiguran");
  res.redirect("/");
});

app.get("/safeXSS", (req, res) => {
  res.clearCookie(`Vulnerable cookie`);
  res.cookie(`Safe cookie`, `safe cookie encryption`, {
    httpOnly: true,
  });
  console.log("Safe Cookie has been saved successfully");
  res.redirect("/");
});


app.listen(port, () => {
  console.log("The server is running port 5000...");
});
