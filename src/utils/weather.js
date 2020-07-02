const axios = require("axios");
const getGeo = require("./geo");
const baseWeatherUrl = "http://api.weatherstack.com/";
const apiWeatherKey = "cd8c5c487178c173844d8d9e50b5189a";

const getWeather = async (address) => {
  try {
    const geo = await getGeo(address);
    const latitude = geo.data.features[0].center[1];
    const longtitude = geo.data.features[0].center[0];

    console.log(latitude);

    const response = await axios.get(
      baseWeatherUrl +
        `current?access_key=${apiWeatherKey}&query=${latitude},${longtitude}`
    );

    const currentTemp = response.data.current.temperature;
    const currentFeelsLikeTemp = response.data.current.feelslike;

    console.log(currentTemp);

    console.log(
      `The temperature is ${currentTemp}. It's feels like ${currentFeelsLikeTemp}`
    );

    return { currentTemp: currentTemp, feelsLikeTemp: currentFeelsLikeTemp };
  } catch (err) {
    console.log("something get wrong in getting weather");
  }
};

module.exports = getWeather;
