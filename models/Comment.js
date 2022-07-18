const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model { }

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model:'user',
                key: 'id',
            }
        },
        reviewtext: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        theater_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'theater',
                key: 'id',
            }
        },
        seatingrating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        concessionsrating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        audiorating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        videorating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        parkingrating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        servicerating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        crowdrating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'review',
    }
);

module.exports = Review;