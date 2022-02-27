const request = require("request-promise-native");

// Define and export fetchMyIP
const fetchMyIP = function() {
  return request("https://api.ipify.org?format=json"); // which returns JSON string {"ip":"50.92.178.211"}
};

const fetchCoordsByIP = function(body) {
  // Need to parse the JSON string from fetchMyIP???
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};


const nextISSTimesForMyLocation = function(body) {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });

};

module.exports = { nextISSTimesForMyLocation };