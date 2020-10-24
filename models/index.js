const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');
const Comment = require('./Comment');

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// Constraint imposed here is that a post can belong to one user, but not many users. 
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});
// These 2 'belongsToMany' methods allow both User and Post models to query each other's information in the context of a vote. 
Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_post',
    foreignKey: 'post_id'
});


// By also creating one-to-many associations between these models, we can perform aggregated SQL functions between models. 
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

module.exports = {User, Post, Vote, Comment};

// all this file is responsible for right now is importing the User model and exporting an object with it as a property