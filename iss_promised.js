const request = require("request-promise-native");

// Define and export fetchMyIP
const fetchMyIP = function() {
  return request("https://api.ipify.org?format=json");
};

module.exports = { fetchMyIP };