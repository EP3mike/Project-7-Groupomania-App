// class object of a user taken from database table structure
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        username: { type: Sequelize.STRING, allowNull: false },
        email: { type: Sequelize.STRING, allowNull: false },
        password: { type: Sequelize.STRING, allowNull: false },
    },
    {
        timestamps: false,
    }
    );
    return User;
};