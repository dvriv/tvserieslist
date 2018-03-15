const bcrypt = require('bcryptjs');
const jwtOptions = require('../../auth/passport.js');
const jwt = require('jsonwebtoken');
const db = require('../../db/db');


const user = module.exports = {};
// User Models Helpers

//  hash and compare hash
user.hashPass = (password, callback) => bcrypt.hash(password, 10, callback);
user.comparePass = (password, hash, callback) => bcrypt.compare(password, hash, callback);


//  adding new user to the db
user.addNewUser = (username, email, hash) => {
  const query = {
    text: 'INSERT INTO users(username, email, hash) VALUES($1, $2, $3) RETURNING *',
    values: [username, email, hash],
  };

  db.query(query, (err, res) => {
    if (err) {
      console.log('error inserting user', err);
      return false;
    }
    console.log('success', res.rows[0]);
    return res.rows[0];
  });
};

// Authenticating an user (Checking if hashs match)
user.authUser = (res, username, password) => {
  const query = {
    text: 'SELECT hash, id FROM users WHERE username = $1',
    values: [username],
  };

  db.query(query, (err, result) => {
    if (err) {
      return false;
    }
    if (result.rowCount === 0) {
      // res.sendStatus(401).json({ message: 'No such user found' });
      console.log('USER NO EXIST');
      return false;
    }
    console.log(result.rows[0].id);
    const { hash } = result.rows[0];
    const { id } = result.rows[0];

    user.comparePass(password, hash, (err, response) => {
      if (response) {
        const payload = { userId: id };
        jwt.sign(payload, 'jwtOptionssecretOrKey', null, (err, token) => {
          if (err) {
            console.log('ERROR signing token');
            return false;
          }
          console.log(token);
          return true;
        });
      }
      if (err) {
        console.log('ERROR WHILE COMPARING HASHES');
        return false;
      }

      if (!response) {
        console.log('password doesnt match');
        return false;
      }
    });


  });

  //  console.log(hash);
};
