const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./post.json')
const commentData = require('./comments.json');

const seedDatabase = () => {
  return sequelize.sync({ force: true }).then(() => {
    User.bulkCreate(userData).then(() => {
      Post.bulkCreate(postData).then(() => {
      Comment.bulkCreate(commentData).then(() => {
          console.log('All Seeds Planted');
        });
      });
    });
  })
  process.exit(0);
};

seedDatabase();
