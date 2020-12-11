const express = require('express');
const passport = require('passport');
const port = process.env.PORT || 8080;
const FacebookStrategy  = require('passport-facebook').Strategy;
const session  = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes');
require('dotenv').config();
const app = express();

// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the FacebookStrategy within Passport.
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_API_KEY,
    clientSecret: process.env.FACEBOOK_API_SECRECT
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      console.log(accessToken, refreshToken, profile, done);
      return done(null, profile);
    });
  }
));
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', key: 'sid'}));
app.use(passport.initialize());
app.use(passport.session());

//app.get('/', (req, res) => {res.send('welcome to e_store')})
app.use(routes);

app.listen(port);