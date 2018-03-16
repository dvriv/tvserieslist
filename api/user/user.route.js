const express = require('express');

const userRouter = express.Router();
const passport = require('passport');
const user = require('./user.model.js');

userRouter.use('/profile', passport.authenticate('jwt', { session: false }));

userRouter.route('/registration').post((req, res) => {
  const { password } = req.body;
  const { username } = req.body;
  const { email } = req.body;

  const newUser = async () => {
    const hash = await user.hashPass(password);
    user.addNewUser(username, email, hash);
  };

  newUser();

  console.log('Inserting new user on DB');
});

userRouter.route('/login')
  .post((req, res) => {
    const { password } = req.body;
    const { username } = req.body;

    console.log(password, username);
    user.authUser(res, username, password);
  });

userRouter.route('/profile')
  .get((req, res) => {
    res.send('You have access to this protected route');
  });

module.exports = userRouter;
