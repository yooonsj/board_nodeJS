var express       = require('express');
var bodyparser    = require('body-parser');
var flash         = require('connect-flash');
var session       = require('express-session');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

app.set('views', __dirname + '/views/');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));
app.use(express.static('libs'));

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use(flash());

app.use(session({
    secret: 'NODEJS_STUDY',
    resave: false,
    saveUninitialized: true
}));

require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

var router = require('./routes/index')(express);

app.use(function(req, res, next) {
    var session;
    if (req.session) {
      session = req.session;
    }

    res.locals.session = session;
    next();
});
app.use('/', router);

module.exports = app;
