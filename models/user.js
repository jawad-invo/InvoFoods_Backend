'use strict';
const {
  Model, STRING, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type: STRING,
      allowNull: false,
      is: ["^[a-zA-Z ]*$", 'i'],
      notEmpty: true,
      min: 2,
      max: 30
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true,
      notEmpty: true,
    },
    password: {
      type: STRING,
      allowNull: false,
      unique: true,
      notEmpty: true,
      min: 6,
      max: 30
    },
    gender: {
      type: STRING,
      allowNull: false,
      notEmpty: true,
      min: 4,
      max: 6
    },
    age: {
      type: INTEGER,
      allowNull: false,
      notEmpty: true,
    },
    role: {
      type: STRING,
      allowNull: false,
      notEmpty: true,
      is: ['Male', 'Female', 'Other']
    },
    verification: {
      type: INTEGER,
      allowNull: true,
      notEmpty: false,
      min: 4,
      max: 4
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};