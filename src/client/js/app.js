let projectData = {};

const appURL = "http://localhost:8080";

const city = document.getElementById("city");
const dateS = document.getElementById("date_start");
const dateE = document.getElementById("date_end");
const showdata = document.getElementById("showData");

const tripto = document.getElementById("tripTo");
const CounDown = document.getElementById("count");
const dura = document.getElementById("dura");
const rturn = document.getElementById("rturn");
const weather = document.getElementById("weather");
const rtime = document.getElementById("rtime");
const showIMG = document.getElementById("showIMG");
const arriv = document.getElementById("arriv");

const btnSearch = document.getElementById("btnSearch");

console.log("--->>");

// CountDownTimer

// Function to POST data
export function handleSubmit(event) {
  // event.preventDefault();

  const geoFURL = appURL + "/geonames?city=" + city.value;
  console.log("Start Submit");
  console.log(geoFURL);

  if (!city.value && !dateS.value && !dateE.value) {
    return alert(" Please enter your Trip Data");
  }

  const data = getData(geoFURL).then((data) => {
    //showdata.removeAttribute = "hidden";

    tripto.innerHTML = "Trip to : " + city.value;

    arriv.innerHTML = "Arriving date : " + dateS.value;
    rturn.innerHTML = "Leaving at : " + dateE.value;

    countTimer();
    console.log(data.img.webformatURL);
    weather.innerHTML =
      "Temprature :" +
      data.weather.data[0].temp +
      "-" +
      data.weather.data[0].weather.description;
    showIMG.setAttribute = ("src", data.img[0].webformatURL);
  });
}

// to calculate the
let dNow = new Date();
export const countTimer = async () => {
  console.log("clicked");
  const sDate = dateS.value;
  const edate = dateE.value;
  const depart = new Date(sDate).getTime();
  const enDate = new Date(edate).getTime();
  console.log("---Departure-->", depart, "---End-->", enDate);

  CounDown.innerHTML =
    " Remaining time : " +
    "<b>" +
    Math.ceil((depart - dNow.getTime()) / (1000 * 60 * 60 * 24)) +
    "</b>" +
    "<b> \n Day(s)</b>";
  dura.innerHTML =
    "Length of Trip : \n" +
    Math.ceil((enDate - depart) / (1000 * 60 * 60 * 24)) +
    "\n days";
};

//get and post data from an api
export const getData = async (url = "") => {
  const response = await fetch(url);
  if (response.status === 404) {
    alert("Error!!!");
  }
  try {
    const data = response.json();
    return data;
  } catch (error) {
    alert(error);
  }
};

// post the data in server
export const postData = async (pixaURL = "", data = {}) => {
  const response = await fetch(appURL + "/add", {
    metod: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

export default handleSubmit;
