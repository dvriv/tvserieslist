const passport = require('passport');
const passportJWT = require('passport-jwt');

const { ExtractJwt } = passportJWT;
const JwtStrategy = passportJWT.Strategy;
const db = require('../db/db.js');

const jwtOptions = module.exports = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'asecretreallysecret';


const strategy = new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  // Strategy checking the id on the payload and check if the user exist
  console.log('payload received', jwtPayload);
  const { userId } = jwtPayload;
  const { rowCount } = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
  console.log('actual user is', rowCount);

  if (rowCount) {
    return done(null, true);
  }
  return done(null, false);
});

passport.use(strategy);