'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscriber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Subscriber.init({
    user_id: DataTypes.INTEGER,
    menu_id: DataTypes.INTEGER,
    package_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Subscriber',
  });
  return Subscriber;
};