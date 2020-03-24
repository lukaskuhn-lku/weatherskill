require("dotenv").config();

const request = require("request-promise");
const config = require("./config");
const weather = require("./data/weather");

const apiKey = process.env.API_KEY;
const cityName = "Tampa";

weather.getWeather("Chicago").then(weather => {
  console.log(weather);
});
