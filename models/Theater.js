const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Theater extends Model {}

Theater.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seatingrating: {
      type: DataTypes.INTEGER,
    },
    concessionsrating: {
      type: DataTypes.INTEGER,
    },
    audiorating: {
      type: DataTypes.INTEGER,
    },
    videorating: {
      type: DataTypes.INTEGER,
    },
    parkingrating: {
      type: DataTypes.INTEGER,
    },
    servicerating: {
      type: DataTypes.INTEGER,
    },
    crowdrating: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'theater',
  }
);

module.exports = Theater;
