const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create out Post model
class Post extends Model{}

// create fields/columns for Post Model
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            // Here we establish the relationship between this post and the user by creating a reference to the User Model
            references: {
                model: 'user',
                // specifically to the id column from the User model
                key: 'id'
            }
        }
    },
    {
        // Configured MetaData
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;