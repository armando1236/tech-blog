const User = require('./User');
const Theater = require('./Theater');
const Review = require('./Review')

Review.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Review, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Review.belongsTo(Theater, {
    foreignKey: 'theater_id',
});

Theater.hasMany(Review, {
    foreignKey: 'theater_id',
});

module.exports = { User, Theater, Review };
