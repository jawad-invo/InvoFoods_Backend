const fs = require('fs');
const csv = require('csv-parser');
const flightData = require('../records');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let flights = [];
    fs.createReadStream('flights.csv')
      .pipe(csv())
      .on('data', (row) => {
        const flight = {
          name: row.name,
          plane_number: row.plane_number,
          total_seats: row.total_seats,
          seats_left: row.seats_left,
          class_id: row.class_id,
          createdAt: '2022-01-23',
          updatedAt: '2022-01-23',
        };
        flights.push(flight);
      })
      .on('end', () => {
        flights = flightData;
        queryInterface.bulkInsert('flights', flights, {});
      });
  },

  down: async (queryInterface, Sequelize) => {},
};
