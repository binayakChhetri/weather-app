// ADDING EVENT LISTNERS TO THE WINDOW WHICH THEN WILL RUN THE UPADTE DAY/NIGHT FUNCTION

window.addEventListener("load", dayNight);

// GETTING THE CONTAINER AND STORING IT IN VARIABLE

const container = document.querySelector('.container');

// CHANGING THE BACKGROUND IMAGE BASED ON DAY AND NIGHT

function dayNight() {
  let time = new Date().getHours();

  if ((time >= 18 && time <= 23) || (time >= 0 && time <= 6)) {
    setBgToNight();
  } else {
    setBgToDay();
  }
}

  // THIS FUNCTION WILL SET THE BACKGROUND IMAGE TO NIGHT 
  function setBgToNight() {
    container.style.backgroundImage = 'url(images/night.jpg)';
    showTemp.style.color ='white';
    tempFormat.style.color = 'white';
    place.style.color = 'white';
  }

  // THIS FUNCTION WILL SET THE BACKGROUND IMAGE TO DAY 
  function setBgToDay() {
    container.style.backgroundImage = 'url(images/day.jpg)';
    showTemp.style.color ='green';
    tempFormat.style.color = 'green';
    place.style.color = 'green';

  }

// STORING THE SEARCH OPTION AND BUTTON IN THE VARIABLE

const search = document.querySelector("#search-for-cities");
const searchButton = document.querySelector("#search");


// CREATING AN OBJECT THAT TRACKS THE TEMPERATURE AND THE PLACE NAME
let tempLists = {
  tempInC: "",
  placeName: "",
  tempInFahrenheit: "",
};

// GETTING THE TEMPERATURE AND PLACE NAME SECTION
const showTemp = document.querySelector("#temp");
const place = document.querySelector(".city-name");

// GETTING THE WEATHER INFO CLASS

const weatherInfo = document.querySelector(".temperature");

// GETTING THE TEMP-FORMAT AND STORING IT IN VARIABLE

const tempFormat = document.querySelector("#temp-format");

// ADDING EVENT LISTNER TO THE SEACH CITY SECTION AND SERACH BUTTON SO THAT THE
// USER WILL BE ABLE TO CLICK ENTER OR THE SEARCH ICON TO SEARCH THE CITY'S WEATHER

search.addEventListener("keyup", searchForCity);
searchButton.addEventListener("click", searchForCity);

// THIS FUCNTION SEARCH FOR THE CITY

function searchForCity(event) {
  
  dayNight();

  let keyName = event.key;

  if (keyName === "Enter" || event.type === "click") {
    let cityName = search.value;
    getWeather(cityName)
      .then((temperature) => changeToC(temperature))
      .catch((error) => {
        displayError();
        console.log(error.message);
      });
  } else {
    return;
  }
}

// THIS FUNCTION GETS THE TEMPERATURE

async function getWeather(cityName) {
  console.log(cityName);
  const getDatas = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f1f4ee4441db8cea0616988fc57a7206`
  );

  const nextData = await getDatas.json();

  return nextData.main.temp_min;
}

// THIS FUNCTION WILL DISPLAY ERROR IF CITY WAS NOT FOUND OR INTERNET WAS NOT CONNECTED

function displayError() {
  let cannotFind = "Failed to get the weather";

  place.style.color = "red";
  place.style.fontFamily = "lato";
  place.fontSize = "10px";
  place.textContent = cannotFind;

  showTemp.textContent = "?";
}

// THIS FUNCTION WILL CHANGE THE TEMPERATURE FROM KELVIN TO DEGREE CELSIUS

function changeToC(temp) {
  tempLists.tempInC = Math.round(temp - 273.15);

  displayTempAndPlace();
}

// THIS FUNCTION WILL DISPLAY THE PLACE NAME AND THE TEMPERATURE ON THE SCREEN

function displayTempAndPlace() {
  tempLists.placeName = search.value;

  place.textContent = tempLists.placeName.toUpperCase();
  place.style.fontFamily = "ubuntu,sans-serif";
  showTemp.textContent = tempLists.tempInC + "°";
}

// ADDING EVENT LISTNER TO THE WEATHER INFO
weatherInfo.addEventListener("click", changeTempFormat);

//  THIS FUNCTION WILL CHANGE THE TEMPERATURE FROM CELSIUS TO FAHRENHEIT AND VICE VERSA
// DEPENDING UPON THE SITUATION

function changeTempFormat() {
  if (tempFormat.textContent === "C") {
    tempFormat.textContent = "F";
    tempLists.tempInFahrenheit = Math.round(1.8 * tempLists.tempInC + 32);

    showTemp.textContent = tempLists.tempInFahrenheit + "°";
  } else if (tempFormat.textContent === "F") {
    tempFormat.textContent = "C";
    tempLists.tempInC = Math.round((tempLists.tempInFahrenheit - 32) / 1.8);

    showTemp.textContent = tempLists.tempInC + "°";
  }
}
