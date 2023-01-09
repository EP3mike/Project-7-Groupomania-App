//class object of a post taken from database table structure
module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('post', {
        postTitle: { type: Sequelize.STRING, allowNull: false },
        postImage: { type: Sequelize.STRING, allowNull: true },
        postDescription: { type: Sequelize.STRING, allowNull: false },
    },
    {
        timestamps: false,
    }
    );
    return Post;
};