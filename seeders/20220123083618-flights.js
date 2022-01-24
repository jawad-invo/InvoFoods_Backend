'use strict';
var fs = require('fs');
const csv = require('csv-parser');

var flights = [];


async function parseCSV() {
  fs.createReadStream('flights.csv')
    .pipe(csv())
    .on('data', function (row) {
      const flight = {
        "name": "plane_I",
        "plane_number": 12934,
        "total_seats": 175,
        "seats_left": 175,
        "class_id": 1,
        "createdAt": "2022-01-23",
        "updatedAt": "2022-01-23"
      }
      flights.push(flight);
    }).on('end', function () {
      return 1;
    })
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await parseCSV();
    console.log(flights);
    queryInterface.bulkInsert('flights', flights, {});
  },

  down: async (queryInterface, Sequelize) => {

  }
};