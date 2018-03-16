const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../db/db');
const jwtOptions = require('../../auth/passport.js');

const user = module.exports = {};


// Function to hash password using bcrypt
user.hashPass = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  }
  catch (err) {
    console.log('error', err);
    return false;
  }
};

// Function to compare the password and hash
user.comparePass = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  }
  catch (err) {
    console.log('error', err);
  }
};

//  adding new user to the db
user.addNewUser = async (username, email, hash) => {
  try {
    const query = {
      text: 'INSERT INTO users(username, email, hash) VALUES($1, $2, $3) RETURNING *',
      values: [username, email, hash],
    };
    const result = await db.query(query);
    console.log('success', result.rows[0]);
    return result.rows[0];
  }
  catch (err) {
    console.log('error', err);
  }
};


// Authenticating an user (Checking if hashs match)
user.authUser = async (res, username, password) => {
  try {
    // Check if the user exist
    const query = {
      text: 'SELECT hash, id FROM users WHERE username = $1',
      values: [username],
    };

    const result = await db.query(query);
    if (result.rowCount === 0) {
      throw new Error('User doesnt exist');
    }
    // If so compare Hashes
    const { hash } = result.rows[0];
    const { id } = result.rows[0];
    const compareRes = await user.comparePass(password, hash);

    // If hashes are the same, then sign the payload.
    if (compareRes) {
      const payload = { userId: id };
      const token = jwt.sign(payload, jwtOptions.secretOrKey, null);
      console.log(token);
      return true;
    }
    if (!compareRes) {
      console.log('password doesnt match');
      return false;
    }
    return false;
  }
  catch (err) {
    console.log(err);
  }
};

