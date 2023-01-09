// main app
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models');

//controllers
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/posts');

const app = express();

//package to prevent CORS errors
app.use(cors());

//package to parse req body
app.use(bodyParser.json());

//connects to our mssql server by sequelize method
db.sequelize.sync({ force: false})
    .then(() => {
        console.log('Successfully connected to Groupomania Database!');
    })
    .catch((error) => {
        console.log('Unable to connect to Groupomania Database!');
        console.error(error);
    });

//forwards image sent to server to the image backend folder
// app.use('/images', express.static(path.join(__dirname, 'images')));

//forwards all api/auth/user req to routers 
app.use("/api/auth/", userRoutes);

//forwards all api/post req to routers
app.use('/api/posts', postRoutes);





module.exports = app;