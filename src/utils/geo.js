const axios = require("axios");

const baseGeoUrl = "https://api.mapbox.com/";
const apiGeoKey =
  "pk.eyJ1IjoibWFyY3VzZmVuaXgiLCJhIjoiY2thcjN4aGh2MDY1dDJwbnFicnl4cTZtMyJ9.dXp5Wa2dSC_2_ZvB2OJzVQ";

const getGeo = async (address) => {
  try {
    const response = await axios.get(
      baseGeoUrl +
        `geocoding/v5/mapbox.places/${address}.json?access_token=${apiGeoKey}`
    );

    return response;
  } catch (err) {
    console.log("something get wrong in getting geo");
  }
};

module.exports = getGeo;
