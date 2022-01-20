'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Class, { foreignKey: 'class_id' });
    }
  }
  Schedule.init({
    flight_id: DataTypes.INTEGER,
    take_of_at: DataTypes.DATE,
    land_in_at: DataTypes.DATE,
    class_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};