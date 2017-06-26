var app = require('../../express');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var userModel = require('../models/user/user.model.server.js');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
};
var FacebookStrategy = require('passport-facebook').Strategy;
var facebookConfig = {
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profileFields: ['id', 'emails', 'name', 'photos']
};

passport.use(new LocalStrategy(localStrategy));
passport.use(new GoogleStrategy(googleConfig, googleStrategy));
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.post('/api/register', register);
app.post('/api/login', passport.authenticate('local'), login);
app.post('/api/logout', logout);
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));
app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/#/',
    failureRedirect: '/#/login'
  }));
app.get('/auth/facebook', passport.authenticate('facebook', {
  scope: 'email'
}));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/#/',
    failureRedirect: '/#/login'
  })
);
app.get('/api/loggedin', isLoggedIn);
app.get('/api/user/:userId', findUserById);
app.get('/api/user', findAllUsers);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);

function register(req, res) {
  var newUser = req.body;
  newUser.password = bcrypt.hashSync(newUser.password);

  userModel.createUser(newUser)
    .then(function(newUser) {
      if (newUser) {
        req.login(newUser, function(err) {
          if (err) {
            res.sendstatus(400);
          } else {
            res.json(newUser);
          }
        });
      }
    });
}

function login(req, res) {
  var user = req.user;
  res.json(user);
}

function isLoggedIn(req, res) {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.send('0');
  }
}

function logout(req, res) {
  req.logOut();
  res.send(200);
}

function serializeUser(user, done) {
  done(null, user);
}

function deserializeUser(user, done) {
  userModel.findUserById(user._id)
    .then(
      function(user) {
        done(null, user);
      },
      function(err) {
        done(err, null);
      });
}

function localStrategy(username, password, done) {
  userModel.findUserByUsername(username)
    .then(function(user) {
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          return userModel
            .findUserByCredentials(username, user.password)
            .then(function(user) {
              if (user) {
                return done(null, user);
              } else {
                return done(null, false);
              }
            });
        } else {
          return done(null, false);
        }
      } else {
        return done(null, false);
      }
    });
}

function googleStrategy(token, refreshToken, profile, done) {
  userModel.findUserByGoogleId(profile.id)
    .then(
      function(user) {
        if (user) {
          return done(null, user);
        } else {
          var email = profile.emails[0].value;
          var emailParts = email.split("@");
          var newGoogleUser = {
            username: emailParts[0],
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: email,
            image: profile._json.image.url,
            google: {
              id: profile.id,
              token: token
            }
          };
          return userModel
            .createUser(newGoogleUser);
        }
      },
      function(err) {
        if (err) {
          return done(err);
        }
      })
    .then(function(user) {
        return done(null, user);
      },
      function(err) {
        if (err) {
          return done(err);
        }
      });
}

function facebookStrategy(token, refreshToken, profile, done) {
  userModel.findUserByFacebookId(profile.id)
    .then(
      function(user) {
        if (user) {
          return done(null, user);
        } else {
          var email = profile.emails[0].value;
          var emailParts = email.split("@");
          var newFacebookUser = {
            username: emailParts[0],
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value,
            email: email,
            facebook: {
              id: profile.id,
              token: token
            }
          };
          return userModel
            .createUser(newFacebookUser);
        }
      },
      function(err) {
        if (err) {
          return done(err);
        }
      })
    .then(function(user) {
        return done(null, user);
      },
      function(err) {
        if (err) {
          return done(err);
        }
      });
}

function updateUser(req, res) {
  var userId = req.params.userId;
  var newInfo = req.body;

  userModel.updateUser(userId, newInfo)
    .then(function() {
      res.sendStatus(200);
    });
}

function deleteUser(req, res) {
  var userId = req.params.userId;

  userModel.deleteUser(userId)
    .then(function() {
      res.sendStatus(200);
    });
}

function findUserById(req, res) {
  var userId = req.params.userId;

  userModel.findUserById(userId)
    .then(function(user) {
      res.json(user);
    });
}

function findAllUsers(req, res) {
  var username = req.query.username;
  var password = req.query.password;

  // findUserByCredentials
  if (username && password) {
    userModel.findUserByCredentials(username, password)
      .then(
        function(user) {
          if (user) {
            res.json(user);
          } else {
            res.sendStatus(404);
          }
        });
  }
  // findUserByUsername
  else if (username) {
    userModel.findUserByUsername(username)
      .then(
        function(user) {
          if (user) {
            res.json(user);
          } else {
            res.sendStatus(404);
          }
        });
  } else {
    userModel.findAllUsers()
      .then(function(users) {
        res.json(users);
      });
  }
}
