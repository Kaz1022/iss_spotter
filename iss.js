// This contains most of the logic for fetching the data from each API endpoint.

const request = require('request');
const { paramsHaveRequestBody } = require('request/lib/helpers');

// Define a function fetchMyIP which will asynchronously return our IP Address using an API
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  const apiURL = "https://api.ipify.org/?format=json";

  request(apiURL, (error, response, body) => {
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Reseponse: ${body}`;
      callback(Error(msg), null);
      return;
    }

    //If no error, return the value of [ip]key. 
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });

};

// Define a function fetchCoordsByIP which will asynchronously return our coordinates Address using an API
const fetchCoordsByIP = function(ip, callback) {

  const apiURL = `https://freegeoip.app/json/${ip}`;

  request(apiURL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};

// Define a funtion fetchISSFlyOverTimes 
const fetchISSFlyOverTimes = function(coords, callback) {

  const apiURL = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(apiURL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching fly over times for IP: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // You only want response key
    const data = JSON.parse(body).response;
    callback(null, data);

  });

};

// Define the nextISSTimesForMyLocation function
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    
    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coordinates, (error, data) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, data);  
      });
    });
  });

};


module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};


