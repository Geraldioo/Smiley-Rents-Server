'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Type.belongsTo(models.Lodging)
    }
  }
  Type.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "type can't be null"
        },
        notEmpty: {
          msg: "type can't be empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Type',
  });
  return Type;
};