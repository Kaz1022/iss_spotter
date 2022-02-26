// This contains most of the logic for fetching the data from each API endpoint.

/**
 * Define a function fetchMyIP which will asynchronously return our IP Address using an API.
 * 
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

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

module.exports = { fetchMyIP };

