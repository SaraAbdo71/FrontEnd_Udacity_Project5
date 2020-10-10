// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = 8080;
var path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
// Cors for cross origin allowance
const cors = require("cors");
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
const axios = require("axios");

/* Middleware*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

app.listen(port, function () {
  console.log("Listening at 8080");
});

app.get("/", function (req, res) {
  res.sendFile(path.resolve("dist/index.html"));
});

app.post("/add", addData);

function addData(req, response) {
  projectData = {
    trip: req.body.tripTo,
    depart: req.body.depart,
    rturn: req.body.rturn,
    weather: req.body.weather,
    rtime: req.body.rtime,
  };
  console.log(projectData);
  return response.send({ type: "Success" });
}

app.post("/search", function (req, res) {
  //var data = req.body;

  console.log(data);
  return res.send({ type: "Success" });
});

app.get("/geonames", function (req, res) {
  console.log("urlCity");
  console.log(req.query);
  const urlCity = process.env.geoURL + req.query.city + process.env.geoUser;

  console.log(urlCity);
  axios
    .get(urlCity)
    .then((response) => {
      let city = response.data.geonames[0];
      getWeather(city.lat, city.lng).then((weather) => {
        getImg(req.query.city).then((img) => {
          console.log("--1-->>>city");
          console.log(city);
          console.log("--2-->>>weather");
          console.log(weather);
          console.log("--3-->>>ImagePixaBay");
          console.log(img);
          res.end(
            JSON.stringify({
              city: city,
              weather: weather,
              img: img,
            })
          );
        });
      });
    })
    .catch((err) => {
      res.end(JSON.stringify({ err: "ERROR!!!" }));
    });
});

async function getWeather(lat, lng) {
  const urlWeath =
    process.env.wURL + "lon=" + lng + process.env.wKey + "&lat=" + lat;
  console.log(urlWeath);
  const weather = await axios.get(urlWeath);
  return weather.data;
}

async function getImg(city) {
  const urlPic =
    process.env.pixaURL +
    process.env.piKey +
    "&q=" +
    city +
    process.env.pixabayURL;
  console.log(urlPic);
  const img = await axios.get(urlPic);
  if (img.data.totalHits != 0) {
    return img.data.hits[0];
  } else {
    return { error: "no results" };
  }
}
