// Setup empty JS object to act as endpoint for all routes
projectData = {};
require('server-com.js');
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
const { response } = require("express");

/* Middleware*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.sendFile(path.resolve("dist/index.html"));
});

app.listen(port, function () {
  console.log("Listening at 8080");
});


app.post('/add', addData);

function addData (req, response) {
  projectData = {
    trip: req.body.tripTo,
    depart: req.body.depart,
    rturn: req.body.rturn,
    weather: req.body.weather,
    rtime: req.body.rtime,
  };
  console.log(projectData);
  return response.send({ type: "Success" });
};
 

app.post("/search", function (req, res) {
  var data = req.body;

  console.log(data);
  return res.send({ type: "Success" });
});

app.post("/geonames", (req, res) => {
  const { city } = req.query;
  getGeoNames(process.env.geoCit + city.value, geoUser).then((response) => {
    res.end(JSON.stringify(response));
  });
});

app.post("/weather", (req, res) => {
  const { lat, long } = req.query;
  getWeather(process.env.wKey, lat, long)
    .then((response) => {
      res.end(JSON.stringify(response));
    })
    .catch((error) => console.log(error));
});

app.post('/pixabay',(req,res)=>{
  const {
    picture
  } = req.query.image;
  getPixabay(process.env.piKey,picture).then(response=>{
    res.end(JSON.stringify(response));
  });
});