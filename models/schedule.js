const { Model, INTEGER, STRING } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Booking, { foreignKey: 'schedule_id' });
      this.belongsTo(models.Class, { foreignKey: 'class_id' });
      this.belongsTo(models.Flight, { foreignKey: 'flight_id' });
    }
  }
  Schedule.init(
    {
      flight_id: {
        type: INTEGER,
        allowNull: false,
        notEmpty: true,
      },
      take_of_at: {
        type: Date,
        allowNull: false,
        notEmpty: true,
      },
      land_in_at: {
        type: Date,
        allowNull: false,
        notEmpty: true,
      },
      class_id: {
        type: STRING,
        allowNull: false,
        notEmpty: true,
      },
      place: {
        type: STRING,
        allowNull: false,
        notEmpty: true,
        min: 2,
        max: 30,
      },
    },
    {
      sequelize,
      modelName: 'Schedule',
    }
  );
  return Schedule;
};
