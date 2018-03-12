const express = require('express');

const userRouter = express.Router();

const bcrypt = require('bcryptjs');
const jwtOptions = require('../../auth/passport.js');
const jwt = require('jsonwebtoken');
const user = require('./user.model.js');

userRouter.route('/registration')
  .post((req, res) => {
    const { password } = req.body;
    const { username } = req.body;
    const { email } = req.body;

    const test2 = user.hashPass(password, (err, hash) => user.addNewUser(username, email, hash));
    console.log('Inserting new user on DB');
  });

userRouter.route('/login')
  .post((req, res) => {
    const { password } = req.body;
    const { username } = req.body;

    console.log(password, username);
    user.authUser(res, username, password);
  });


module.exports = userRouter;
