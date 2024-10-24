let searchData = document.querySelector(".btn");
let l = document.querySelector("#location");

searchData.addEventListener("click", (e) => {
  if (l.value != "" && l.value != null) fetchWeatherData(l.value);
});

async function fetchWeatherData(cityName) {
  try {
    console.log(cityName);
    let data = await window.fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9a4d757b8be168a7d7b02b07027133e2`);
    let finalData = await data.json();
    let displayData = document.querySelector(".display-data");
    let displayTemp = document.querySelector(".display-temp");
    let displayLocation = document.querySelector(".display-location");
    let displaySpeed = document.querySelector(".display-speed");
    let displayHumidity = document.querySelector(".display-humidity");
    let icon = document.querySelector("#icon");
    if (finalData.cod == "404") {
      let asideDataDisappear = document.querySelectorAll(".inactive");
      [...asideDataDisappear].forEach((v, i) => {
        v.Style.display = "none";
      });
      displayData.innerHTML =
        "Location is not valid. Please enter valid Location";
      displayData.Style.color = "red";
    } else {
      console.log(finalData);
      console.log(displayTemp);
      let { name, main, wind, weather } = finalData;
      displayTemp.innerHTML = parseInt(main.temp - 273.15) + "°C";
      displayLocation.innerHTML = name;
      displaySpeed.innerHTML = wind.speed + "km/hr";
      displayHumidity.innerHTML = main.humidity + "%";
      icon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    }
  } catch (error) {
    console.log("err");
  }
}
