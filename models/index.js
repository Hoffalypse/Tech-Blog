const User = require('./User');
const Review = require('./Review');


// Review belongs to User
Review.belongsTo(User, {
  foreignKey: 'user_id',
  
});
// User has many reviews
User.hasMany(Review, {
  foreignKey: 'user_id'
  
});
module.exports = {
    User,
    Review  
  };