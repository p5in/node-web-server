const request = require("request");

const forecast = (lattitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/1dfefef1567962dd76f4c3660f1befa4/" +
    lattitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect error", undefined);
    } else if (body.error) {
      callback("getting some error", undefined);
    } else {
      console.log(body.daily.data[0]);

      callback(
        undefined,
        body.daily.data[0].summary +
          " It is currently " +
          body.currently.temperature +
          " . high today is " +
          body.daily.data[0].temperatureHigh +
          " with a low of  " +
          body.daily.data[0].temperatureLow +
          " . There is a " +
          body.currently.precipProbability +
          "% chance of rain"
      );
    }
  });
};

module.exports = forecast;
