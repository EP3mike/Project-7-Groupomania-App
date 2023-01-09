//initialize sequelize for our mssql server

const dbConfig = require("../config/dbConfig");

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.min,
        idle: dbConfig.pool.idle,
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize; // our server connection 

db.posts = require('./post')(sequelize, Sequelize); // post sequelize model
db.users = require('./user')(sequelize, Sequelize); //user sequelize model
db.listOfReaders = require('./readPost')(sequelize, Sequelize); // users who read post list model

//relation built between post table and list of Readers table
db.posts.hasMany(db.listOfReaders, {as: 'listOfReaders'});
db.listOfReaders.belongsTo(db.posts, {
    foreignKey: 'postId',
    as: 'post',
});

module.exports = db;
