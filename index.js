const weatherApiKey = "ac7f064efbe7fcb0b58561ab46ec4e57";

const map_ApiKey = "AIzaSyAAe6i1T7mhHt8Xh_5vvcLFLnbVeOoMbjU";

async function getData() {
  let Search = document.getElementById("Search").value;
  let wetherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${Search}&cnt=7&appid=${weatherApiKey}&units=metric`;
  let mapUrl = `https://www.google.com/maps/embed/v1/place?key=${map_ApiKey}&q=${Search}`;
  let res = await fetch(wetherUrl);
  let dataW = await res.json();
  let mapG = document.querySelector("iframe");
  mapG.src = mapUrl;
  // console.log(mapUrl);
  return dataW;
}
let dateobj = new Date();
let currDateIndex = dateobj.getDay();
let currDay = dateobj.toLocaleString("default", { weekday: "long" });
console.log(currDay);
document.getElementById("day1").innerText = currDay;

async function displayWeather() {
  const data = await getData();

  let city = data.city.name;
  const weatherArr = data.list;
  // console.log(weatherArr)
  let res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`
  );
  let currweather = await res.json();
  let currTemp = Math.round(currweather.main.temp);
  let cloud = currweather.weather[0].description;
  document.getElementById("clouds").textContent = cloud;
  let daysArr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  document.getElementById("day1").innerText = currDay;
  document.getElementById("tempCurr").innerText = currTemp;
  document.getElementById("cityText").innerText = city;
  document.getElementById("daysDiv").innerHTML = "";
  let i = 0;

  console.log(currweather);

  weatherArr.map(function (ele, index) {
    let mainDiv = document.createElement("div");
    mainDiv.setAttribute("class", "smallW");
    let h1_1 = document.createElement("h1");
    h1_1.textContent = daysArr[i];
    i++;
    let h1_2 = document.createElement("h1");
    let temp = Math.round(ele.main.temp);
    h1_2.textContent = `${temp}°c `;
    mainDiv.append(h1_1, h1_2);
    document.getElementById("daysDiv").append(mainDiv);
  });

  // console.log(currTemp, cloud);
}