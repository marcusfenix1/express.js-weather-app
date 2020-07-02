const path = require("path");
const express = require("express");
const hbs = require("hbs");
const getGeo = require("./utils/geo");
const getWeather = require("./utils/weather");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("views", viewsPath);
app.set("view engine", "hbs");

hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", { title: "from Dynamic" });
});

app.get("/help", (req, res) => {
  res.send({ name: "Andrew", age: 27 });
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.get("/weather", (req, res) => {
  const queryAddress = req.query.address;
  console.log(req.query.address);

  if (!queryAddress) {
    return res.send({ error: "You must provide and adress!" });
  }

  (async () => {
    const currentWeather = await getWeather(queryAddress);
    res.send({
      currentTemp: currentWeather.currentTemp,
      feelsLikeTemp: currentWeather.feelsLikeTemp,
      address: req.query.address,
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

app.listen(3000, () => console.log("Server is up on port 3000."));
