var LocalStrategy = require('passport-local').Strategy;
var mysql         = require('./db/mysql');
var user          = require('../models/user');
var bcrypt        = require('bcrypt');

module.exports = function(passport) {
    //serializer와 deseriazlier는 필수로 구현해야 함.
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use('login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback : true
        },
        function(req, email, password, done) {
            mysql.query(user.select, {email: email}, function(err, rows, fields) {
                if (err) {
                    throw err;
                }

                if (!rows.length) {
                    return done(null, false, req.flash('msg', 'Incorrect username.'));
                }

                var user = rows[0];
                bcrypt.compare(password, user.password, function(err, isMatch) {
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, req.flash('msg', 'Incorrect password.'));
                    }
                });
            });
        }
    ));
};
