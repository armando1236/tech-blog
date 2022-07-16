const sequelize = require('../config/connection');
const { User, Theater, Review } = require('../models');

const userData = require('./userData.json');
const reviewData = require('./reviews.json');
const theaterData = require('./theater.json')

const seedDatabase = () => {
  return sequelize.sync({ force: true }).then(() => {
    User.bulkCreate(userData).then(() => {
      Theater.bulkCreate(theaterData).then(() => {
        Review.bulkCreate(reviewData).then(() => {
          console.log('All Seeds Planted');
        });
      });
    });
  })
  process.exit(0);
};

seedDatabase();
