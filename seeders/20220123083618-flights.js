'use strict';
var fs = require('fs');
const csv = require('csv-parser');
const flightData = require('../records');

var flights = flightData.flights;


module.exports = {
  up: async (queryInterface, Sequelize) => {
    fs.createReadStream('flights.csv')
      .pipe(csv())
      .on('data', function (row) {
        const flight = {
          name: row.name,
          plane_number: row.plane_number,
          total_seats: row.total_seats,
          seats_left: row.seats_left,
          class_id: row.class_id,
          createdAt: "2022-01-23",
          updatedAt: "2022-01-23"
        }
        flights.push(flight);
      }).on('end', function () {
        var flights = flightData.flights;
        queryInterface.bulkInsert('flights', flights, {});
      })
  },

  down: async (queryInterface, Sequelize) => {
  }
};