const User = require('./User');
const Post = require('./Post');

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// Constraint imposed here is that a post can belong to one user, but not many users. 
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = {User, Post};

// all this file is responsible for right now is importing the User model and exporting an object with it as a property