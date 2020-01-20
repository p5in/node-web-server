const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoicGFuZGV5cHJhdmVlbjM2OTYiLCJhIjoiY2s1ZzdreWlsMDRpMzNtcXIyZjVydWM4bCJ9.VZDOOiNkUTYyL6xmYM2PWQ&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect location services", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find location try another search", undefined);
    } else {
      callback(undefined, {
        lattitude: body.features[0].center[1],
        langitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
