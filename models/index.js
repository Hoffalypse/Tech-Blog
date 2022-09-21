const User = require('./User');
const Review = require('./Review');
const Comment = require('./Comment');


// Review belongs to User
Review.belongsTo(User, {
  foreignKey: 'user_id',
  
});
// User has many reviews
User.hasMany(Review, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Review,{
  foreignKey: 'review_id'
});

Review.hasMany(Comment,{
  foreignKey:'review_id'
});

module.exports = {
    User,
    Review,
    Comment
  };