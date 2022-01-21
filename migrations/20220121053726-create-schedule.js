'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flight_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "flights",
          key: "id"
        }
      },
      take_of_at: {
        type: Sequelize.DATE
      },
      land_in_at: {
        type: Sequelize.DATE
      },
      class_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "classes",
          key: "id"
        }
      },
      place: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Schedules');
  }
};