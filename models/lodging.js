'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lodging extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lodging.hasMany(models.Type)
      Lodging.hasMany(models.User)
    }
  }
  Lodging.init({
    name: DataTypes.STRING,
    facility: DataTypes.TEXT,
    roomCapacity: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING,
    location: DataTypes.STRING,
    price: DataTypes.INTEGER,
    typeId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Lodging',
  });
  return Lodging;
};