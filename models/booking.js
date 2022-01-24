const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Schedule, { foreignKey: 'id' });
    }
  }
  Booking.init(
    {
      user_id: DataTypes.INTEGER,
      schedule_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Booking',
    }
  );
  return Booking;
};
