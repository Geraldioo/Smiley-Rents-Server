'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require("bcryptjs")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Lodging, {
        foreignKey: "authorId"
      })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "email already exist"
      },
      validate: {
        notNull: {
          msg: "email can't be null"
        },
        notEmpty: {
          msg: "email can't be empty"
        },
        isEmail: {
          msg: "input must be email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password can't be null"
        },
        notEmpty: {
          msg: "password can't be empty"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "Staff",
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "phoneNumber can't be null"
        },
        notEmpty: {
          msg: "phoneNumber can't be empty"
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "address can't be null"
        },
        notEmpty: {
          msg: "address can't be empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
  })

  return User;
};
