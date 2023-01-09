// middleware to check if signup is done successfully
//ie checks if duplicate username and or email exists in db

const db = require('../models'); // contains our db connection
const User = db.users // connects to our user model

//checks db for duplicate email or username
checkDuplicate = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Username taken!",
      });
      return;
    }
  });

  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Email taken!",
      });
      return;
    }
    next();
  });
};


// checkDuplicate = (req, res, next) => {
//     // Username
//     User.findOne({
//       where: {
//         username: req.body.username
//       }
//     }).then(user => {
//       if (user) {
//         res.status(400).send({
//           message: "Username is already in use!"
//         });
//         return;
//       }
  
//       // Email
//       User.findOne({
//         where: {
//           email: req.body.email
//         }
//       }).then(user => {
//         if (user) {
//           res.status(400).send({
//             message: "Email is already in use!"
//           });
//           return;
//         }
  
//         next();
//       });
//     });
// };

const verifySignUp = {
    checkDuplicate: checkDuplicate
};

module.exports = verifySignUp;