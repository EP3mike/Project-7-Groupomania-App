//class object of table containing list of users who have read a linked post
module.exports = (sequelize, Sequelize) => {
    const readPostList = sequelize.define('listOfReaders', {
        // postId: {type: Sequelize.INTEGER}, // maybe not needed since tied to post so passeed as fk
        userId: {type: Sequelize.INTEGER}, // to check against logged in local storage to impliment read post css class
    },
    {
        timestamps: true,
    }
    );
    return readPostList;
};