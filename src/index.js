const path = require("path");
const express = require("express");
const hbs = require("hbs");
const getGeo = require("./utils/geo");
const getWeather = require("./utils/weather");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("views", viewsPath);
app.set("view engine", "hbs");

hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", { title: "Weather app" });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help", name: "Eugene" });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Eugene Zhoglo",
  });
});

app.get("/weather", (req, res) => {
  const queryAddress = req.query.address;
  console.log(req.query.address);

  if (!queryAddress) {
    return res.send({ error: "You must provide an address!" });
  }

  (async () => {
    const currentWeather = await getWeather(queryAddress);
    res.send({
      currentTemp: currentWeather.currentTemp,
      feelsLikeTemp: currentWeather.feelsLikeTemp,
      address: currentWeather.location,
      currentHumidity: currentWeather.currentHumidity,
    });
  })();

  // console.log(currentWeather.currentTemp);
});

app.get("/help/*", (req, res) => {
  res.render("404", { article: "Help article not found" });
});

app.get("*", (req, res) => {
  res.render("404", { article: "Page not Found" });
});

app.listen(port, () => console.log("Server is up on port " + port));
