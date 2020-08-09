let projectDData={};
const geoURL = "http://api.geonames.org/searchJSON?q=";
const geoUser = "&username=s.abdo";

const wURL =
  " https://api.weatherbit.io/v2.0/current?key=b14d31afc25c4fc997fb547e6207252a";

const pixaURL =
  "https://pixabay.com/api/?key=17643734-8108b09269e3fc50eebc94544";

const appURL = "http://localhost:8080";

const city = document.getElementById("city");
const dateS = document.getElementById("date_start");
const dateE = document.getElementById("date_end");

const tripto = document.getElementById("tripTo");
const depart = document.getElementById("depart");
const rturn = document.getElementById("rturn");
const weather = document.getElementById("weather");
const rtime = document.getElementById("rtime");
const showIMG= document.getElementById("showIMG");

const btnSearch = document.getElementById("btnSearch");
const btnClose = document.getElementById("sClose");
const btnSave = document.getElementById("sSave");

const timeNow = Date.now() / 1000;

const geoFURL = geoURL + city.value + geoUser;

function checkInput(leavingFromText, goingToText) {
  let urlRGEX = /^[a-zA-Z\s]{0,255}$/;
  if (urlRGEX.test(leavingFromText) && urlRGEX.test(goingToText)) {
    return;
  } else {
    alert("please enter a valid name");
  }
}

function getData() {
  fetch(appURL + "/getData")
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log("data", data);
      if (data.showData) {
        tripto.innerHTML = data.tripTo;
        depart.innerHTML = data.depart;
        rturn.innerHTML = data.rturn;
        weather.innerHTML = data.weather;
        rtime.innerHTML = data.rtime;
      }
    });
}
/* Function to POST data */
btnSearch.onclick = function () {
  const reqData = {
    city: city.value,
    start_date: dateS.value,
    end_date: dateE.value,
  };
  var params = new URLSearchParams(reqData).toString();
  console.log(params);

  sendRequest(appURL + "/search", reqData, "POST").then(
    (data) => {
      console.log("return ", data);

     
    
    const getCoord = async (geoFURL) => {
      const response = await fetch(geoFURL);
      try {
        const geoArray = await response.json();
        const geoData = geoArray.geonames[0];
        return geoData;
      } catch (error) {
        console.log("error-->", error);
      }
    };

    const postData = async (url = "", data = {}) => {
      const response = await fetch((url = appURL + "/add"), {
        metod: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      try {
        const newData = await response.json();
        return newData;
      } catch (error) {
        console.log("error", error);
      }
    };

    getCoord(geoFURL).then(function (geoNData) {
      postData(addLocat, {
        country: geonames.countryName,
        date: newDate,
        userREsponse: arrialDay,
        daysLeft: difference,
        longitude: geonamesData.lng,
        latitude: geonamesData.lat,
      });
    });
  });

  
  fetch(appURL + params)
    .then(function (resp) {
      return resp.json();
    }) // Convert data to json
    .then(function (data) {
      console.log(data);
      if (data.cod !== "404") {
        data.city = city.value;
        data.dateS = dateS.value;
        data.dateE = dateE.value;
        sendRequest(appURL + "/add", data, "POST").then((data) => {
          getData();
        });
      }
    })
    .catch(function () {
      // catch any errors
    });
 
    };/*
    async function handleSubmit(event) {
      event.preventDefault();
      console.log("startSubmit");
      let locat = city.value;
      let start = dateS.value;
      letend = dateE.value;
      const startDate = new Date(start);
      const endDate = new Date(end);
      const tTime = endDate.getTime() - startDate.getTime();
      const daysT = `${tTime / (1000 * 60 * 60 * 24)} days`;

      await goTrip(appURL + "/dotrip", {
        Location: locat,
        Start: startDate,
        End: endDate,
        duration: daysT,
      });
      upateDate(startDate, endDate, daysT, locat);
      await geoData(appURL + "/getGeo");
      const weatherData = await getWeather(appURL + "/getWea");
      console.log(weatherData.weather);
      upateWeather(weatherData);
      const img = await getImg(appURL + "/getImg");
      upateImg(img);
    }
  );
};*/
// let dat = new date();

const postData = async (datas => {
	fetch(appURl+'/dest',{
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
	},
			body: JSON.stringify({place: datas})
	})
	.then(res=>res.json())
	.then(function(res) {
		consol.log(res);
		tripto.innerHTML = "Trip To : \n "+ res.city.value;
	})
	.catch((error)=>{
		
		consol.log(error+" City ERROR");
	});
});

const postWeather = async(datas) => {
	fetch(appURL+"/Weath", {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({place: content})
	})
	.then(res=>res.json())
	.then(function(res) {
		console.log(res);
		weather.innerHTML = " Weather Today \n"+res.weather+"\n C";
	})
	.catch((error)=>{
		console.log(error,"Weather ERROR");
	});
};
const postImg = async(datas) => {
	fetch(appURL+'/img', {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({place: content})
	})
	.then(res=> res.json())
	.then(function(res){
        console.log(res)
        showIMG.innerHTML= res.image;
	})
}


async function actions (e){
e.preventDefault();
	console.log("Action here");

const dest = city.value;
const sDate = dateS.value;
const eDate= dateE.value;
 depart = new date(sDate).getTime();
 rtime.innerHTML = `Math.ceil(((departure-d.getTime())/(1000 * 60 * 60 * 24)))+"</b>"+"<b> \n Days!`;
 
 const cities=city.value;
postData();
postWeather();
postImg();
 
};
/*
async function postData(geoFURL, data = {}, method = "POST") {
  // Default options are marked with *
  var options = {
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  };
  if (method != "POST") {
    options.body = JSON.stringify(data); // body data type must match "Content-Type" header
  } else {
    console.log("---->" + error);
  }
  const response = await fetch(geoFURL, options);

  return response.json(); // parses JSON response into native JavaScript objects
}
*/

actions();
