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
      Lodging.belongsTo(models.Type, {
        foreignKey: "typeId"
      })
      Lodging.belongsTo(models.User, {
        foreignKey: "authorId"
      })
    }
  }
  Lodging.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "name can't be null"
        },
        notEmpty: {
          msg: "name can't be empty"
        }
      }
    },
    facility: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "facility can't be null"
        },
        notEmpty: {
          msg: "facility can't be empty"
        }
      }
    },
    roomCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "roomCapacity can't be null"
        },
        notEmpty: {
          msg: "roomCapacity can't be empty"
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "imgUrl can't be null"
        },
        notEmpty: {
          msg: "imgUrl can't be empty"
        },
        isUrl: {
          msg: 'must be url format'
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "location can't be null"
        },
        notEmpty: {
          msg: "location can't be empty"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "price can't be null"
        },
        notEmpty: {
          msg: "price can't be empty"
        },
        min: {
          args: 10000,
          msg: "min price is 10_000"
        }
      }
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "typeId can't be null"
        },
        notEmpty: {
          msg: "typeId can't be empty"
        }
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "authorId can't be null"
        },
        notEmpty: {
          msg: "authorId can't be empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Lodging',
  });
  return Lodging;
};