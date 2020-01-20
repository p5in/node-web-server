const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Praveen Pandey"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Praveen"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    helpText: "Created by praveen",
    name: "Help"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "No Address Found"
    });
  }

  geocode(
    req.query.address,
    (error, { lattitude, langitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(lattitude, langitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({ error: "Must Provide Search Term" });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "Help Article not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "error page",
    message: "Page not found",
    name: "name path error page"
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
