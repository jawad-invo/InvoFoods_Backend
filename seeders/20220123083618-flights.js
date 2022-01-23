'use strict';
var fs = require('fs');
const csv = require('csv-parser');
var flights = [];


module.exports = {
  up: async (queryInterface, Sequelize) => {
    fs.createReadStream('flights.csv')
      .pipe(csv())
      .on('data', function (row) {
        const flight = {
          name: row.name,
          plane_number: parseInt(row.plane_number),
          total_seats: parseInt(row.total_seats),
          seats_left: parseInt(row.seats_left),
          class_id: 1,
          createdAt: now(),
          updatedAt: now()
        }
        flights.push(flight);
      }).on('end', function () {
        queryInterface.bulkInsert('flights', flights, {});
      })
  },

  down: async (queryInterface, Sequelize) => {

  }
};