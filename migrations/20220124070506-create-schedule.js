module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      flight_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Flights',
          key: 'id',
        },
      },
      take_of_at: {
        type: Sequelize.DATE,
      },
      land_in_at: {
        type: Sequelize.DATE,
      },
      class_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Classes',
          key: 'id',
        },
      },
      place: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint('Schedules', {
      fields: ['flight_id', 'take_of_at'],
      type: 'unique',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Schedules');
  },
};
