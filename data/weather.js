const request = require("request-promise");
const config = require("./../config");
const kelvinToFahrenheit = require("kelvin-to-fahrenheit");

class Weather {
  constructor(temperature, humidity, windspeed) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.windspeed = windspeed;
  }

  static getWeather(cityName) {
    return new Promise((resolve, reject) => {
      let options = {
        uri: `https://${config.MAIN_URL}q=${cityName}&appid=${process.env.API_KEY}`,
        json: true
      };

      request
        .get(options)
        .then(data => {
          let windspeed = data.wind.speed;
          let humidity = data.main.humidity;
          let temperature = data.main.temp;

          let temperatureFahrenheit = kelvinToFahrenheit(temperature);

          /* console.log(
            `The temperature in ${cityName} is ${temperatureFahrenheit}°F. The humidity is at ${humidity}% and windspeed is ${windspeed}.`
          ); */

          resolve(new Weather(temperatureFahrenheit, humidity, windspeed));
        })
        .catch(e => {
          reject(e);
        });
    });
  }
}

module.exports = Weather;
