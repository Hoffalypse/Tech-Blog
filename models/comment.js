const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Comment extends Model { 



}
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    review_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'review',
        key: 'id',
      },
  },
  },
  {
 
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
  
);

module.exports = Comment;