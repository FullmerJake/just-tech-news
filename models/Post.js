const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create out Post model
class Post extends Model{
    // now we can use Post.upvote() as if it were one of Sequelize's other built in methods. 
    // paramaters: req.body and an object of the model.
    static upvote(body, models) {
        return models.Vote.create({
            user_id: body.user_id,
            post_id: body.post_id
        })
        .then( () => {
            return Post.findOne({
                where: {
                    id: body.post_id
                },
                attributes: [
                    'id',
                    'post_url',
                    'title',
                    'created_at',
                    [
                        sequelize.literal('(SELECT COUNT (*) FROM vote WHERE post.id = vote.post_id'),
                        'vote_count'
                    ]
                ]
            });
        });
    }
}

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