const sequelize = require('../config/connection');
const { User } = require('../models');
const { Review } = require('../models');
const { Comment } = require('../models');

const userData = require('./userData.json');
const reviewData = require('./reviewData.json');
const commentData = require('./commentData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Review.bulkCreate(reviewData, {
    individualHooks: true,
    returning: true,
  });
  await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();