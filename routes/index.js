module.exports = function(express) {
    var router   = express.Router();
    var mysql    = require('../config/db/mysql');
    var user     = require('../models/user');
    var passport = require('passport');
    var bcrypt   = require('bcrypt');
    var SALT_WORK_FACTOR = 10;
    var logger   = require('../config/logger');

    router.get('/', function(req, res) {
        logger.info('test');
        res.render('index');
    });

    router.post('/login', function(req, res) {
        passport.authenticate('login', function(err, user, info) {
            if (err) {
                console.error(err);
            }

            if (!user) {
                res.send(req.flash('msg'));
            }

            req.logIn(user, function(err) {
                if (err) {
                    console.error(err);
                }

                res.end();
            });
        })(req, res);
    });

    router.post('/join', function(req, res) {
        var param = req.body;

        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) return next(err);

            bcrypt.hash(param.password, salt, function(err, hash) {
                if (err) return next(err);

                var data = {
                    email: param.email,
                    name: param.name,
                    password: hash
                };
                mysql.query(user.insert, data, function(err, rows, fields) {
                    var msg = '';

                	if (err) {
                		console.error(err);
                        msg = 'join fail';
            		}

        		    res.send(msg).end();
                });
            });
        });
    });

    router.get('/logout', function(req, res) {
        req.logout();
        delete req.session.passport;
        res.redirect('/');
    });

    return router;
};
