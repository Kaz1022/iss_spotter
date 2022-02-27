const { nextISSTimesForMyLocation } = require("./iss_promised");

const printPassTimes = function(passtimes) {
  for (const pass of passtimes) {
    // ?? Shouldnt it be let?? 
    const datetime = new Date(0);// -> returns 1970-01-01T00:00:00.000Z
    //add the passtimes.risetime to datetime object
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passtimes) => {
    printPassTimes(passtimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });