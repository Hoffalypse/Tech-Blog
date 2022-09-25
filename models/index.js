const User = require('./user');
const Review = require('./review');
const Comment = require('./comment');


// Review belongs to User
Review.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete:"cascade"
  
});
// User has many reviews
User.hasMany(Review, {
  foreignKey: 'user_id',
  onDelete:"cascade"
});

Comment.belongsTo(Review,{
  foreignKey: 'review_id',
  onDelete:"cascade"
});

Review.hasMany(Comment,{
  foreignKey:'review_id',
  onDelete:"cascade"
});
Comment.belongsTo(User,{
  foreignKey: 'user_id',
  onDelete:"cascade"
});

User.hasMany(Comment,{
  foreignKey:'user_id',
  onDelete:"cascade"

});

module.exports = {
    User,
    Review,
    Comment
  };