const passport = require('passport');
const passportJWT = require('passport-jwt');

const { ExtractJwt } = passportJWT;
const JwtStrategy = passportJWT.Strategy;
const db = require('../db/db.js');

const user = require('../api/user/user.model.js');

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'asecretreallysecret';


const strategy = new JwtStrategy(jwtOptions, (jwt_payload, done) => {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  // const actualUser = MongoClient.connect(url, (err, db) => user.userExist(db, () => db.close(), jwt_payload.id));

  const actualUser = db.query('SELECT * FROM users WHERE username = $1', jwt_payload.id, (err, res) => {
    if (err) {
      return false;
    }
    return res.row[0];
  });

  if (actualUser) {
    done(null, user);
  } else {
    done(null, user);
  }
});

passport.use(strategy);
module.exports = jwtOptions;
