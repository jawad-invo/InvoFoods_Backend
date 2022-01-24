const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Schedule, { foreignKey: 'flight_id' });
    }
  }
  Flight.init(
    {
      name: DataTypes.STRING,
      plane_number: DataTypes.INTEGER,
      total_seats: DataTypes.INTEGER,
      seats_left: DataTypes.INTEGER,
      class_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Flight',
    }
  );
  return Flight;
};
